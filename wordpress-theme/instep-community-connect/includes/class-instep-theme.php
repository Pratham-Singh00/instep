<?php
/**
 * Main Theme Class - Simplified CPT-based version
 * 
 * Manages Team Members and Contact Requests via WordPress CPTs
 * Front page content can be managed via settings page
 *
 * @package InStepCommunityConnect
 * @since 1.0.0
 */

if (!defined('ABSPATH')) {
    exit;
}

class Instep_Theme
{
    private static ?self $instance = null;
    private ?array $manifest = null;

    public static function instance(): self
    {
        if (null === self::$instance) {
            self::$instance = new self();
        }
        return self::$instance;
    }

    private function __construct()
    {
        add_action('init', [$this, 'register_cpts']);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        add_action('admin_menu', [$this, 'register_admin_menu']);
        add_action('admin_post_instep_save_content', [$this, 'handle_admin_form']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);
        add_action('save_post_team_member', [$this, 'save_team_member_meta']);
        add_action('after_switch_theme', [$this, 'on_theme_activation']);
    }

    public function on_theme_activation(): void
    {
        $this->register_cpts();
        $this->populate_team_members();
        flush_rewrite_rules();
    }

    /**
     * Populate team members from default content on theme activation
     */
    public function populate_team_members(): void
    {
        $default_content = $this->get_default_content();
        
        if (empty($default_content['team']['members'])) {
            return;
        }

        // Check if team members already exist
        $existing = get_posts(['post_type' => 'team_member', 'numberposts' => 1]);
        if (!empty($existing)) {
            return; // Don't overwrite existing team members
        }

        foreach ($default_content['team']['members'] as $member) {
            $post_id = wp_insert_post([
                'post_type' => 'team_member',
                'post_title' => $member['name'] ?? 'Team Member',
                'post_content' => $member['bio'] ?? '',
                'post_status' => 'publish',
            ]);

            if (!is_wp_error($post_id)) {
                update_post_meta($post_id, '_team_title', $member['title'] ?? '');
                update_post_meta($post_id, '_team_credentials', implode(', ', $member['credentials'] ?? []));
                update_post_meta($post_id, '_team_specialties', implode(', ', $member['specialties'] ?? []));
                update_post_meta($post_id, '_team_email', $member['email'] ?? '');
                update_post_meta($post_id, '_team_phone', $member['phone'] ?? '');
            }
        }
    }

    /**
     * Register custom post types
     */
    public function register_cpts(): void
    {
        // Team Members CPT
        register_post_type('team_member', [
            'labels' => [
                'name' => __('Team Members', 'instep-community-connect'),
                'singular_name' => __('Team Member', 'instep-community-connect'),
                'menu_name' => __('Team', 'instep-community-connect'),
                'add_new' => __('Add Member', 'instep-community-connect'),
                'add_new_item' => __('Add New Team Member', 'instep-community-connect'),
                'edit_item' => __('Edit Team Member', 'instep-community-connect'),
                'view_item' => __('View Team Member', 'instep-community-connect'),
                'all_items' => __('All Team Members', 'instep-community-connect'),
            ],
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => true,
            'menu_position' => 24,
            'show_in_admin_bar' => false,
            'exclude_from_search' => true,
            'publicly_queryable' => false,
            'has_archive' => false,
            'supports' => ['title', 'editor', 'thumbnail', 'custom-fields'],
            'menu_icon' => 'dashicons-groups',
            'capability_type' => 'post',
            'map_meta_cap' => true,
            'show_in_rest' => true,
            'register_meta_box_cb' => [$this, 'add_team_meta_boxes'],
        ]);

        // Add meta box for standard Posts
        add_action('add_meta_boxes_post', [$this, 'add_post_meta_boxes']);
        add_action('save_post_post', [$this, 'save_post_meta']);
        
        // Expose custom author to REST API
        add_action('rest_api_init', function() {
            register_rest_field('post', 'custom_author_name', [
                'get_callback' => function($object) {
                    return get_post_meta($object['id'], '_instep_custom_author', true);
                },
                'schema' => [
                    'description' => 'Custom author name override',
                    'type' => 'string',
                    'context' => ['view', 'edit'],
                ],
            ]);
        });

        // Contact Requests CPT
        register_post_type('contact_request', [
            'labels' => [
                'name' => __('Contact Requests', 'instep-community-connect'),
                'singular_name' => __('Contact Request', 'instep-community-connect'),
                'all_items' => __('All Contact Requests', 'instep-community-connect'),
            ],
            'public' => false,
            'show_ui' => true,
            'show_in_menu' => true,
            'menu_position' => 25,
            'show_in_admin_bar' => false,
            'exclude_from_search' => true,
            'publicly_queryable' => false,
            'has_archive' => false,
            'supports' => ['title', 'editor'],
            'menu_icon' => 'dashicons-email',
            'capability_type' => 'post',
            'map_meta_cap' => true,
            'show_in_rest' => false,
            'register_meta_box_cb' => [$this, 'add_contact_meta_boxes'],
        ]);
    }

    /**
     * Add meta boxes for team members
     */
    public function add_team_meta_boxes($post): void
    {
        add_meta_box('team_info', __('Team Information', 'instep-community-connect'), function($post) {
            $title = get_post_meta($post->ID, '_team_title', true);
            $credentials = get_post_meta($post->ID, '_team_credentials', true);
            $specialties = get_post_meta($post->ID, '_team_specialties', true);
            $email = get_post_meta($post->ID, '_team_email', true);
            $phone = get_post_meta($post->ID, '_team_phone', true);

            wp_nonce_field('team_meta_nonce', 'team_nonce');
            ?>
            <div style="margin-bottom: 15px;">
                <label><strong><?php esc_html_e('Job Title:', 'instep-community-connect'); ?></strong></label><br/>
                <input type="text" name="team_title" value="<?php echo esc_attr($title); ?>" style="width: 100%;" />
            </div>
            <div style="margin-bottom: 15px;">
                <label><strong><?php esc_html_e('Credentials (e.g., LCSW, CGP):', 'instep-community-connect'); ?></strong></label><br/>
                <input type="text" name="team_credentials" value="<?php echo esc_attr($credentials); ?>" style="width: 100%;" />
            </div>
            <div style="margin-bottom: 15px;">
                <label><strong><?php esc_html_e('Specialties:', 'instep-community-connect'); ?></strong></label><br/>
                <textarea name="team_specialties" style="width: 100%; height: 80px;"><?php echo esc_textarea($specialties); ?></textarea>
            </div>
            <div style="margin-bottom: 15px;">
                <label><strong><?php esc_html_e('Email:', 'instep-community-connect'); ?></strong></label><br/>
                <input type="email" name="team_email" value="<?php echo esc_attr($email); ?>" style="width: 100%;" />
            </div>
            <div style="margin-bottom: 15px;">
                <label><strong><?php esc_html_e('Phone:', 'instep-community-connect'); ?></strong></label><br/>
                <input type="tel" name="team_phone" value="<?php echo esc_attr($phone); ?>" style="width: 100%;" />
            </div>
            <?php
        }, 'team_member', 'normal');
    }

    /**
     * Save team member meta
     */
    public function save_team_member_meta($post_id): void
    {
        if (!isset($_POST['team_nonce']) || !wp_verify_nonce($_POST['team_nonce'], 'team_meta_nonce')) {
            return;
        }

        update_post_meta($post_id, '_team_title', sanitize_text_field($_POST['team_title'] ?? ''));
        update_post_meta($post_id, '_team_credentials', sanitize_text_field($_POST['team_credentials'] ?? ''));
        update_post_meta($post_id, '_team_specialties', sanitize_textarea_field($_POST['team_specialties'] ?? ''));
        update_post_meta($post_id, '_team_email', sanitize_email($_POST['team_email'] ?? ''));
        update_post_meta($post_id, '_team_phone', sanitize_text_field($_POST['team_phone'] ?? ''));
    }

    /**
     * Add meta boxes for contact requests
     */
    public function add_contact_meta_boxes($post): void
    {
        add_meta_box('contact_info', __('Contact Details', 'instep-community-connect'), function($post) {
            echo '<div style="background: #f9f9f9; padding: 15px; border: 1px solid #e5e5e5;">';
            
            // Submitter Info
            echo '<h4 style="margin: 0 0 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Submitter Information</h4>';
            echo '<p><strong>' . esc_html__('Email:', 'instep-community-connect') . '</strong> <a href="mailto:' . esc_attr(get_post_meta($post->ID, '_contact_email', true)) . '">' . esc_html(get_post_meta($post->ID, '_contact_email', true)) . '</a></p>';
            echo '<p><strong>' . esc_html__('Phone:', 'instep-community-connect') . '</strong> ' . esc_html(get_post_meta($post->ID, '_contact_phone', true)) . '</p>';

            // Client Info
            $client_name = get_post_meta($post->ID, '_contact_client_name', true);
            if ($client_name) {
                echo '<div style="margin-top: 20px;">';
                echo '<h4 style="margin: 0 0 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Client Information</h4>';
                echo '<p><strong>' . esc_html__('Client Name:', 'instep-community-connect') . '</strong> ' . esc_html($client_name) . '</p>';
                echo '<p><strong>' . esc_html__('Age:', 'instep-community-connect') . '</strong> ' . esc_html(get_post_meta($post->ID, '_contact_client_age', true)) . '</p>';
                echo '<p><strong>' . esc_html__('Grade:', 'instep-community-connect') . '</strong> ' . esc_html(get_post_meta($post->ID, '_contact_client_grade', true)) . '</p>';
                echo '<p><strong>' . esc_html__('School:', 'instep-community-connect') . '</strong> ' . esc_html(get_post_meta($post->ID, '_contact_client_school', true)) . '</p>';
                echo '</div>';
            }

            // Inquiry Details
            echo '<div style="margin-top: 20px;">';
            echo '<h4 style="margin: 0 0 10px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">Inquiry Details</h4>';
            
            $reasons = get_post_meta($post->ID, '_contact_inquiry_reasons', true);
            if (!empty($reasons)) {
                 // It might be stored as an array or JSON, handle both
                $reasons_list = is_string($reasons) ? $reasons : implode(', ', (array)$reasons);
                echo '<p><strong>' . esc_html__('Reasons:', 'instep-community-connect') . '</strong> ' . esc_html($reasons_list) . '</p>';
            }

            echo '<p><strong>' . esc_html__('Referral Source:', 'instep-community-connect') . '</strong> ' . esc_html(get_post_meta($post->ID, '_contact_referral_source', true)) . '</p>';
            
            // Legacy/Fallback
            $service = get_post_meta($post->ID, '_contact_service', true);
            if ($service) {
                echo '<p><strong>' . esc_html__('Service Interest (Legacy):', 'instep-community-connect') . '</strong> ' . esc_html($service) . '</p>';
            }
            
            echo '<p><strong>' . esc_html__('Urgency:', 'instep-community-connect') . '</strong> <span style="background: #e5e5e5; padding: 2px 6px; border-radius: 3px;">' . esc_html(get_post_meta($post->ID, '_contact_urgency', true)) . '</span></p>';
            echo '</div>';

            echo '</div>';
        }, 'contact_request', 'normal');
    }

    /**
     * Add meta boxes for standard posts
     */
    public function add_post_meta_boxes($post): void
    {
        add_meta_box('instep_post_options', __('In Step Post Options', 'instep-community-connect'), function($post) {
            $custom_author = get_post_meta($post->ID, '_instep_custom_author', true);
            wp_nonce_field('instep_post_nonce', 'instep_post_nonce_field');
            ?>
            <div style="margin-bottom: 15px;">
                <label for="instep_custom_author"><strong><?php esc_html_e('Custom Author Name:', 'instep-community-connect'); ?></strong></label><br/>
                <p class="description"><?php esc_html_e('Leave blank to use the WordPress user name.', 'instep-community-connect'); ?></p>
                <input type="text" id="instep_custom_author" name="instep_custom_author" value="<?php echo esc_attr($custom_author); ?>" style="width: 100%;" />
            </div>
            <?php
        }, 'post', 'side', 'high');
    }

    /**
     * Save post meta
     */
    public function save_post_meta($post_id): void
    {
        if (!isset($_POST['instep_post_nonce_field']) || !wp_verify_nonce($_POST['instep_post_nonce_field'], 'instep_post_nonce')) {
            return;
        }

        if (defined('DOING_AUTOSAVE') && DOING_AUTOSAVE) {
            return;
        }

        if (!current_user_can('edit_post', $post_id)) {
            return;
        }

        if (isset($_POST['instep_custom_author'])) {
            update_post_meta($post_id, '_instep_custom_author', sanitize_text_field($_POST['instep_custom_author']));
        }
    }

    /* ======================== React App ======================== */

    public function enqueue_react_app(): void
    {
        $manifest = $this->get_manifest();

        if (!$manifest) {
            error_log('In Step: Build manifest not found. Run: npm run build:wordpress');
            return;
        }

        $entry = $this->locate_manifest_entry($manifest);
        if (!$entry) {
            return;
        }

        $handle = 'instep-app';
        wp_enqueue_script($handle, INSTEP_THEME_URI . '/assets/build/' . $entry['file'], [], INSTEP_THEME_VERSION, true);

        if (!empty($entry['css'])) {
            foreach ($entry['css'] as $index => $css_file) {
                wp_enqueue_style(
                    $handle . '-css-' . $index,
                    INSTEP_THEME_URI . '/assets/build/' . $css_file,
                    [],
                    INSTEP_THEME_VERSION
                );
            }
        }

        $bridge = [
            'restBase' => esc_url_raw(rest_url()),
            'siteUrl' => esc_url_raw(home_url('/')),
            'themeUrl' => esc_url_raw(INSTEP_THEME_URI),
            'endpoints' => [
                'content' => esc_url_raw(rest_url('instep/v1/content')),
                'posts' => esc_url_raw(rest_url('wp/v2/posts')),
                'contactRequest' => esc_url_raw(rest_url('instep/v1/contact-request')),
            ],
        ];

        wp_add_inline_script($handle, 'window.instepCommunityConnect = ' . wp_json_encode($bridge) . ';', 'before');
    }

    private function get_manifest(): ?array
    {
        if (null !== $this->manifest) {
            return $this->manifest;
        }

        $manifest_path = INSTEP_THEME_DIR . '/assets/build/.vite/manifest.json';
        if (!file_exists($manifest_path)) {
            $manifest_path = INSTEP_THEME_DIR . '/assets/build/manifest.json';
        }

        if (!file_exists($manifest_path)) {
            return null;
        }

        $contents = file_get_contents($manifest_path);
        $decoded = json_decode($contents, true);
        $this->manifest = is_array($decoded) ? $decoded : null;
        return $this->manifest;
    }

    private function locate_manifest_entry(array $manifest): ?array
    {
        foreach (['src/main.tsx', 'src/main.ts', 'main.tsx', 'index.html'] as $key) {
            if (!empty($manifest[$key])) {
                return $manifest[$key];
            }
        }
        return reset($manifest) ?: null;
    }

    /* ======================== REST API ======================== */

    public function register_rest_routes(): void
    {
        register_rest_route('instep/v1', '/content', [
            'methods' => 'GET',
            'callback' => [$this, 'rest_get_content'],
            'permission_callback' => '__return_true',
        ]);

        register_rest_route('instep/v1', '/contact-request', [
            'methods' => 'POST',
            'callback' => [$this, 'rest_create_contact_request'],
            'permission_callback' => '__return_true',
        ]);
    }

    public function rest_get_content(\WP_REST_Request $request): \WP_REST_Response
    {
        $content = $this->get_default_content();
        
        // Fetch team members from database and override default content
        $team_members = $this->get_team_members_from_db();
        if (!empty($team_members)) {
            $content['team']['members'] = $team_members;
        }
        
        return rest_ensure_response($content);
    }

    /**
     * Fetch team members from WordPress database
     */
    private function get_team_members_from_db(): array
    {
        $posts = get_posts([
            'post_type' => 'team_member',
            'numberposts' => -1,
            'orderby' => 'menu_order',
            'order' => 'ASC',
        ]);

        $members = [];
        foreach ($posts as $post) {
            $members[] = [
                'name' => $post->post_title,
                'title' => get_post_meta($post->ID, '_team_title', true),
                'credentials' => array_filter(array_map('trim', explode(',', get_post_meta($post->ID, '_team_credentials', true)))),
                'bio' => $post->post_content,
                'specialties' => array_filter(array_map('trim', explode(',', get_post_meta($post->ID, '_team_specialties', true)))),
                'email' => get_post_meta($post->ID, '_team_email', true),
                'phone' => get_post_meta($post->ID, '_team_phone', true),
                'image' => null, // Can be added later if needed
                'languages' => ['English'],
            ];
        }

        return $members;
    }

    public function rest_create_contact_request(\WP_REST_Request $request): \WP_REST_Response
    {
        $params = $request->get_json_params();
        
        // Basic Info
        $first_name = sanitize_text_field($params['firstName'] ?? '');
        $last_name = sanitize_text_field($params['lastName'] ?? '');
        $email = sanitize_email($params['email'] ?? '');
        $phone = sanitize_text_field($params['phone'] ?? '');
        
        // Client Info
        $client_name = sanitize_text_field($params['clientName'] ?? '');
        $client_age = sanitize_text_field($params['clientAge'] ?? '');
        $client_grade = sanitize_text_field($params['clientGrade'] ?? '');
        $client_school = sanitize_text_field($params['clientSchool'] ?? '');
        
        // Context
        $referral_source = sanitize_text_field($params['referralSource'] ?? '');
        $inquiry_reasons = isset($params['inquiryReasons']) ? array_map('sanitize_text_field', (array)$params['inquiryReasons']) : [];
        $message = wp_kses_post($params['message'] ?? '');
        
        // Legacy/Fallback Fields
        $urgency = sanitize_text_field($params['urgency'] ?? '');
        $service = sanitize_text_field($params['service'] ?? '');

        if (!$first_name || !$email || !$message) {
            return new \WP_REST_Response(['error' => 'Missing required fields'], 400);
        }

        $full_name = trim($first_name . ' ' . $last_name);

        $post_id = wp_insert_post([
            'post_type' => 'contact_request',
            'post_title' => $full_name . ' (' . $email . ')',
            'post_content' => $message,
            'post_status' => 'publish',
        ]);

        if (is_wp_error($post_id)) {
            return new \WP_REST_Response(['error' => 'Failed to save'], 500);
        }

        // Save Meta
        update_post_meta($post_id, '_contact_email', $email);
        update_post_meta($post_id, '_contact_phone', $phone);
        
        update_post_meta($post_id, '_contact_client_name', $client_name);
        update_post_meta($post_id, '_contact_client_age', $client_age);
        update_post_meta($post_id, '_contact_client_grade', $client_grade);
        update_post_meta($post_id, '_contact_client_school', $client_school);
        
        update_post_meta($post_id, '_contact_referral_source', $referral_source);
        update_post_meta($post_id, '_contact_inquiry_reasons', $inquiry_reasons);
        
        // Legacy
        update_post_meta($post_id, '_contact_urgency', $urgency);
        update_post_meta($post_id, '_contact_service', $service);

        return rest_ensure_response(['success' => true, 'id' => $post_id]);
    }

    /* ======================== Content ======================== */

    private function get_default_content(): array
    {
        $default_path = INSTEP_THEME_DIR . '/data/default-content.json';
        if (!file_exists($default_path)) {
            return [];
        }

        $contents = file_get_contents($default_path);
        $decoded = json_decode($contents, true);
        return is_array($decoded) ? $decoded : [];
    }

    /* ======================== Admin ======================== */

    public function register_admin_menu(): void
    {
        add_menu_page(
            __('In Step Settings', 'instep-community-connect'),
            __('In Step Settings', 'instep-community-connect'),
            'manage_options',
            'instep-settings',
            [$this, 'render_admin_page'],
            'dashicons-admin-generic',
            59
        );
    }

    public function enqueue_admin_assets($hook): void
    {
        if ($hook !== 'toplevel_page_instep-settings') {
            return;
        }

        if (file_exists(INSTEP_THEME_DIR . '/assets/admin.css')) {
            wp_enqueue_style('instep-admin', INSTEP_THEME_URI . '/assets/admin.css', [], INSTEP_THEME_VERSION);
        }
    }

    public function render_admin_page(): void
    {
        if (!current_user_can('manage_options')) {
            return;
        }

        $content = $this->get_default_content();
        $success = filter_input(INPUT_GET, 'settings-updated', FILTER_VALIDATE_BOOLEAN);
        ?>
        <div class="wrap">
            <h1><?php esc_html_e('In Step Community Connect Settings', 'instep-community-connect'); ?></h1>

            <?php if ($success) : ?>
                <div class="notice notice-success is-dismissible">
                    <p><?php esc_html_e('Settings saved.', 'instep-community-connect'); ?></p>
                </div>
            <?php endif; ?>

            <div style="margin-top: 20px; padding: 20px; background: #f9f9f9; border: 1px solid #ddd; border-radius: 5px;">
                <h2><?php esc_html_e('How to Manage Content', 'instep-community-connect'); ?></h2>
                <ul style="list-style: disc; margin-left: 20px;">
                    <li><strong><?php esc_html_e('Team Members:', 'instep-community-connect'); ?></strong> Go to the <strong>Team</strong> menu to add, edit, or delete team members.</li>
                    <li><strong><?php esc_html_e('Contact Requests:', 'instep-community-connect'); ?></strong> Go to the <strong>Contact Requests</strong> menu to view all form submissions.</li>
                    <li><strong><?php esc_html_e('Front Page:', 'instep-community-connect'); ?></strong> The front page uses the default content shown below. Edit the JSON to modify it, or use Settings below.</li>
                </ul>
            </div>

            <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" style="margin-top: 20px;">
                <?php wp_nonce_field('instep_save', 'instep_nonce'); ?>
                <input type="hidden" name="action" value="instep_save_content" />

                <h3><?php esc_html_e('Quick Settings', 'instep-community-connect'); ?></h3>
                <table class="form-table">
                    <tr>
                        <th><label for="phone"><?php esc_html_e('Primary Phone:', 'instep-community-connect'); ?></label></th>
                        <td><input type="text" name="phone" id="phone" value="<?php echo esc_attr($content['navigation']['phone'] ?? ''); ?>" class="regular-text" /></td>
                    </tr>
                </table>
                <p class="submit"><button type="submit" class="button button-primary"><?php esc_html_e('Save Changes', 'instep-community-connect'); ?></button></p>
            </form>

            <h3><?php esc_html_e('Frontend Content', 'instep-community-connect'); ?></h3>
            <pre style="background: #f5f5f5; padding: 10px; border-radius: 3px; border: 1px solid #ddd; max-height: 600px; overflow-y: auto;">
<?php echo esc_html(wp_json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)); ?>
            </pre>
        </div>
        <?php
    }

    public function handle_admin_form(): void
    {
        if (!current_user_can('manage_options')) {
            wp_die('Unauthorized');
        }

        check_admin_referer('instep_save', 'instep_nonce');

        // Update options if needed
        wp_safe_redirect(add_query_arg('settings-updated', 'true', menu_page_url('instep-settings', false)));
        exit;
    }
}
