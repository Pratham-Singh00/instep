<?php

if (!defined('ABSPATH')) {
    exit;
}

class Instep_Community_Connect
{
    private static $instance = null;

    private const OPTION_KEY = 'instep_content_settings';

    private ?array $manifest = null;
    private array $style_handles = [];

    public static function instance(): self
    {
        if (null === self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }

    private function __construct()
    {
        add_action('init', [$this, 'register_shortcode']);
        add_action('rest_api_init', [$this, 'register_rest_routes']);
        add_action('admin_menu', [$this, 'register_admin_page']);
        add_action('admin_post_instep_cc_save_content', [$this, 'handle_admin_form']);
        add_action('admin_post_instep_cc_reset_content', [$this, 'handle_reset_content']);
        add_action('admin_enqueue_scripts', [$this, 'enqueue_admin_assets']);
        add_action('wp_enqueue_scripts', [$this, 'register_frontend_assets']);
    }

    /* -------------------------------------------------------------------------
     * Asset loading
     * ---------------------------------------------------------------------- */

    public function register_frontend_assets(): void
    {
        $this->style_handles = [];
        $manifest = $this->get_manifest();

        if (!$manifest) {
            return;
        }

        $entry = $this->locate_manifest_entry($manifest);

        if (!$entry) {
            return;
        }

        $handle = 'instep-community-connect-app';
        $script_url = INSTEP_CC_PLUGIN_URL . 'assets/build/' . $entry['file'];

        wp_register_script(
            $handle,
            $script_url,
            [],
            INSTEP_CC_VERSION,
            true
        );

        if (!empty($entry['css'])) {
            foreach ($entry['css'] as $index => $cssFile) {
                $style_handle = $handle . '-style-' . $index;
                wp_register_style(
                    $style_handle,
                    INSTEP_CC_PLUGIN_URL . 'assets/build/' . $cssFile,
                    [],
                    INSTEP_CC_VERSION
                );
                $this->style_handles[] = $style_handle;
            }
        }
    }

    private function enqueue_frontend_assets(): void
    {
        $this->register_frontend_assets();
        $handle = 'instep-community-connect-app';

        if (!wp_script_is($handle, 'registered')) {
            return;
        }

        foreach ($this->style_handles as $style_handle) {
            wp_enqueue_style($style_handle);
        }

        $bridge = [
            'restBase' => esc_url_raw(rest_url()),
            'endpoints' => [
                'content' => esc_url_raw(rest_url('instep/v1/content')),
                'posts' => esc_url_raw(rest_url('wp/v2/posts')),
                'team' => esc_url_raw(rest_url('instep/v1/team')),
            ],
            'version' => INSTEP_CC_VERSION,
        ];

        $inline = 'window.instepCommunityConnect = ' . wp_json_encode($bridge) . ';';

        wp_add_inline_script('instep-community-connect-app', $inline, 'before');
        wp_enqueue_script('instep-community-connect-app');
    }

    private function get_manifest(): ?array
    {
        if (null !== $this->manifest) {
            return $this->manifest;
        }

        $manifest_path = INSTEP_CC_PLUGIN_DIR . 'assets/build/manifest.json';
        $modern_manifest_path = INSTEP_CC_PLUGIN_DIR . 'assets/build/.vite/manifest.json';

        if (!file_exists($manifest_path) && file_exists($modern_manifest_path)) {
            $manifest_path = $modern_manifest_path;
        }

        if (!file_exists($manifest_path)) {
            return null;
        }

        $contents = file_get_contents($manifest_path);

        if (!$contents) {
            return null;
        }

        $decoded = json_decode($contents, true);

        if (!is_array($decoded)) {
            return null;
        }

        $this->manifest = $decoded;

        return $this->manifest;
    }

    private function locate_manifest_entry(array $manifest): ?array
    {
        $possible_keys = ['src/main.tsx', 'src/main.ts', 'main.tsx', 'index.html'];

        foreach ($possible_keys as $key) {
            if (!empty($manifest[$key])) {
                return $manifest[$key];
            }
        }

        // Fallback to first entry
        return reset($manifest) ?: null;
    }

    /* -------------------------------------------------------------------------
     * Shortcode
     * ---------------------------------------------------------------------- */

    public function register_shortcode(): void
    {
        add_shortcode('instep_community_connect', [$this, 'render_shortcode']);
    }

    public function render_shortcode(): string
    {
        $this->enqueue_frontend_assets();

        return '<div id="instep-community-connect-root"></div>';
    }

    /* -------------------------------------------------------------------------
     * REST API
     * ---------------------------------------------------------------------- */

    public function register_rest_routes(): void
    {
        register_rest_route(
            'instep/v1',
            '/content',
            [
                'methods' => 'GET',
                'callback' => [$this, 'rest_get_content'],
                'permission_callback' => '__return_true',
            ]
        );

        register_rest_route(
            'instep/v1',
            '/team',
            [
                'methods' => 'GET',
                'callback' => [$this, 'rest_get_team'],
                'permission_callback' => '__return_true',
            ]
        );
    }

    public function rest_get_content(\WP_REST_Request $request): \WP_REST_Response
    {
        return rest_ensure_response($this->get_combined_content());
    }

    public function rest_get_team(\WP_REST_Request $request): \WP_REST_Response
    {
        $content = $this->get_combined_content();
        $team = $content['team']['members'] ?? [];

        return rest_ensure_response($team);
    }

    /* -------------------------------------------------------------------------
     * Content helpers
     * ---------------------------------------------------------------------- */

    private function get_default_content(): array
    {
        $default_path = INSTEP_CC_PLUGIN_DIR . 'data/default-content.json';

        if (!file_exists($default_path)) {
            return [];
        }

        $contents = file_get_contents($default_path);

        if (!$contents) {
            return [];
        }

        $decoded = json_decode($contents, true);

        return is_array($decoded) ? $decoded : [];
    }

    private function get_saved_content(): array
    {
        $saved = get_option(self::OPTION_KEY, []);

        return is_array($saved) ? $saved : [];
    }

    private function get_combined_content(): array
    {
        $defaults = $this->get_default_content();
        $saved = $this->get_saved_content();

        return $this->merge_content($defaults, $saved);
    }

    private function merge_content(array $defaults, array $overrides): array
    {
        foreach ($overrides as $key => $value) {
            if (array_key_exists($key, $defaults)) {
                if (is_array($defaults[$key]) && is_array($value)) {
                    if ($this->is_associative($defaults[$key])) {
                        $defaults[$key] = $this->merge_content($defaults[$key], $value);
                    } else {
                        $defaults[$key] = !empty($value) ? $value : $defaults[$key];
                    }
                } else {
                    $defaults[$key] = $value;
                }
            } else {
                $defaults[$key] = $value;
            }
        }

        return $defaults;
    }

    private function is_associative(array $array): bool
    {
        return array_keys($array) !== range(0, count($array) - 1);
    }

    /* -------------------------------------------------------------------------
     * Admin UI
     * ---------------------------------------------------------------------- */

    public function register_admin_page(): void
    {
        add_menu_page(
            __('In Step Content', 'instep-community-connect'),
            __('In Step Content', 'instep-community-connect'),
            'manage_options',
            'instep-community-connect',
            [$this, 'render_admin_page'],
            'dashicons-groups',
            59
        );
    }

    public function enqueue_admin_assets(string $hook): void
    {
        if ($hook !== 'toplevel_page_instep-community-connect') {
            return;
        }

        if (file_exists(INSTEP_CC_PLUGIN_DIR . 'assets/admin.css')) {
            wp_enqueue_style(
                'instep-community-connect-admin',
                INSTEP_CC_PLUGIN_URL . 'assets/admin.css',
                [],
                INSTEP_CC_VERSION
            );
        }

        if (function_exists('wp_enqueue_code_editor')) {
            $settings = wp_enqueue_code_editor(['type' => 'application/json']);
            wp_enqueue_script('code-editor');
            wp_enqueue_style('code-editor');
            if ($settings) {
                wp_add_inline_script(
                    'code-editor',
                    'window.addEventListener("load", function() { if (window.wp && wp.codeEditor) { wp.codeEditor.initialize("instep_content_json", ' . wp_json_encode($settings) . '); } });'
                );
            }
        }
    }

    public function render_admin_page(): void
    {
        if (!current_user_can('manage_options')) {
            return;
        }

        $content = $this->get_combined_content();
        $errors = get_transient('instep_cc_admin_errors');
        delete_transient('instep_cc_admin_errors');
        $success = filter_input(INPUT_GET, 'settings-updated', FILTER_VALIDATE_BOOLEAN);
        ?>
        <div class="wrap">
            <h1><?php esc_html_e('In Step Community Connect', 'instep-community-connect'); ?></h1>
            <?php if (!empty($errors) && is_array($errors)) : ?>
                <div class="notice notice-error">
                    <ul>
                        <?php foreach ($errors as $error) : ?>
                            <li><?php echo esc_html($error); ?></li>
                        <?php endforeach; ?>
                    </ul>
                </div>
            <?php elseif ($success) : ?>
                <div class="notice notice-success is-dismissible">
                    <p><?php esc_html_e('Content settings saved.', 'instep-community-connect'); ?></p>
                </div>
            <?php endif; ?>

            <form method="post" action="<?php echo esc_url(admin_url('admin-post.php')); ?>" class="instep-content-form">
                <?php wp_nonce_field('instep_cc_save_content', 'instep_cc_nonce'); ?>
                <input type="hidden" name="action" value="instep_cc_save_content" />

                <h2><?php esc_html_e('Quick Settings', 'instep-community-connect'); ?></h2>
                <p class="description">
                    <?php esc_html_e('Update the most frequently edited fields. Advanced editors can use the JSON editor below for full control.', 'instep-community-connect'); ?>
                </p>

                <table class="form-table" role="presentation">
                    <tr>
                        <th scope="row"><label for="navigation_phone"><?php esc_html_e('Primary Phone Number', 'instep-community-connect'); ?></label></th>
                        <td>
                            <input type="text" name="navigation_phone" id="navigation_phone" value="<?php echo esc_attr($content['navigation']['phone'] ?? ''); ?>" class="regular-text" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="hero_title_highlight"><?php esc_html_e('Hero Highlight Text', 'instep-community-connect'); ?></label></th>
                        <td>
                            <input type="text" name="hero_title_highlight" id="hero_title_highlight" value="<?php echo esc_attr($content['hero']['titleHighlight'] ?? ''); ?>" class="regular-text" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="hero_description"><?php esc_html_e('Hero Description', 'instep-community-connect'); ?></label></th>
                        <td>
                            <textarea name="hero_description" id="hero_description" rows="3" class="large-text"><?php echo esc_textarea($content['hero']['description'] ?? ''); ?></textarea>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="hero_primary_cta_label"><?php esc_html_e('Hero Primary CTA Label', 'instep-community-connect'); ?></label></th>
                        <td>
                            <input type="text" name="hero_primary_cta_label" id="hero_primary_cta_label" value="<?php echo esc_attr($content['hero']['primaryCta']['label'] ?? ''); ?>" class="regular-text" />
                            <p class="description"><?php esc_html_e('Button text for the main hero call-to-action.', 'instep-community-connect'); ?></p>
                            <input type="url" name="hero_primary_cta_url" value="<?php echo esc_attr($content['hero']['primaryCta']['url'] ?? ''); ?>" class="regular-text" placeholder="https://" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="hero_secondary_cta_label"><?php esc_html_e('Hero Secondary CTA Label', 'instep-community-connect'); ?></label></th>
                        <td>
                            <input type="text" name="hero_secondary_cta_label" id="hero_secondary_cta_label" value="<?php echo esc_attr($content['hero']['secondaryCta']['label'] ?? ''); ?>" class="regular-text" />
                            <input type="url" name="hero_secondary_cta_url" value="<?php echo esc_attr($content['hero']['secondaryCta']['url'] ?? ''); ?>" class="regular-text" placeholder="https://" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="contact_email"><?php esc_html_e('Contact Email', 'instep-community-connect'); ?></label></th>
                        <td>
                            <input type="email" name="contact_email" id="contact_email" value="<?php echo esc_attr($this->find_contact_field($content, 'Email', 'primary')); ?>" class="regular-text" />
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="contact_phone_primary"><?php esc_html_e('Contact Phone Label', 'instep-community-connect'); ?></label></th>
                        <td>
                            <input type="text" name="contact_phone_primary" id="contact_phone_primary" value="<?php echo esc_attr($this->find_contact_field($content, 'Phone', 'primary')); ?>" class="regular-text" />
                            <p class="description"><?php esc_html_e('Main phone number displayed in the contact cards.', 'instep-community-connect'); ?></p>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><label for="footer_about_description"><?php esc_html_e('Footer About Text', 'instep-community-connect'); ?></label></th>
                        <td>
                            <textarea name="footer_about_description" id="footer_about_description" rows="3" class="large-text"><?php echo esc_textarea($content['footer']['about']['description'] ?? ''); ?></textarea>
                        </td>
                    </tr>
                </table>

                <h2><?php esc_html_e('Advanced JSON Editor', 'instep-community-connect'); ?></h2>
                <p class="description">
                    <?php esc_html_e('Paste or edit the full site content configuration below. The structure should match the SiteContent schema used by the React application.', 'instep-community-connect'); ?>
                </p>
                <textarea name="instep_content_json" id="instep_content_json" rows="24" class="large-text code"><?php echo esc_textarea(wp_json_encode($content, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES)); ?></textarea>

                <p class="submit">
                    <button type="submit" class="button button-primary"><?php esc_html_e('Save Changes', 'instep-community-connect'); ?></button>
                    <button type="submit" name="instep_cc_reset" value="1" class="button button-secondary" formnovalidate onclick="return confirm('<?php echo esc_js(__('Reset content to defaults?', 'instep-community-connect')); ?>');">
                        <?php esc_html_e('Reset to Defaults', 'instep-community-connect'); ?>
                    </button>
                </p>
            </form>
        </div>
        <?php
    }

    public function handle_admin_form(): void
    {
        if (!current_user_can('manage_options')) {
            wp_die(__('You do not have permission to perform this action.', 'instep-community-connect'));
        }

        check_admin_referer('instep_cc_save_content', 'instep_cc_nonce');

        if (isset($_POST['instep_cc_reset'])) {
            delete_option(self::OPTION_KEY);
            wp_safe_redirect(add_query_arg('settings-updated', 'true', menu_page_url('instep-community-connect', false)));
            exit;
        }

        $errors = [];

        $content = $this->get_combined_content();

        // Apply quick settings.
        $content['navigation']['phone'] = sanitize_text_field($_POST['navigation_phone'] ?? ($content['navigation']['phone'] ?? ''));
        $content['hero']['titleHighlight'] = sanitize_text_field($_POST['hero_title_highlight'] ?? ($content['hero']['titleHighlight'] ?? ''));
        $content['hero']['description'] = wp_kses_post($_POST['hero_description'] ?? ($content['hero']['description'] ?? ''));

        $content['hero']['primaryCta']['label'] = sanitize_text_field($_POST['hero_primary_cta_label'] ?? ($content['hero']['primaryCta']['label'] ?? ''));
        $content['hero']['primaryCta']['url'] = esc_url_raw($_POST['hero_primary_cta_url'] ?? ($content['hero']['primaryCta']['url'] ?? ''));
        $content['hero']['secondaryCta']['label'] = sanitize_text_field($_POST['hero_secondary_cta_label'] ?? ($content['hero']['secondaryCta']['label'] ?? ''));
        $content['hero']['secondaryCta']['url'] = esc_url_raw($_POST['hero_secondary_cta_url'] ?? ($content['hero']['secondaryCta']['url'] ?? ''));

        $email = sanitize_email($_POST['contact_email'] ?? $this->find_contact_field($content, 'Email', 'primary'));
        $phone_contact = sanitize_text_field($_POST['contact_phone_primary'] ?? $this->find_contact_field($content, 'Phone', 'primary'));

        $email_action = $email ? 'mailto:' . $email : null;
        $phone_action = $phone_contact ? 'tel:' . preg_replace('/[^0-9+]/', '', $phone_contact) : null;

        $content = $this->replace_contact_field($content, 'Email', 'primary', $email, $email_action);
        $content = $this->replace_contact_field($content, 'Phone', 'primary', $phone_contact, $phone_action);

        $content['footer']['about']['description'] = wp_kses_post($_POST['footer_about_description'] ?? ($content['footer']['about']['description'] ?? ''));
        $content['footer']['about']['phone'] = sanitize_text_field($phone_contact);
        $content['footer']['about']['email'] = $email;

        // JSON payload override
        $json_raw = wp_unslash($_POST['instep_content_json'] ?? '');
        if ($json_raw) {
            $decoded = json_decode($json_raw, true);
            if (json_last_error() === JSON_ERROR_NONE && is_array($decoded)) {
                $content = $this->merge_content($this->get_default_content(), $decoded);
            } else {
                $errors[] = __('The JSON provided could not be parsed. Changes from the JSON editor were ignored.', 'instep-community-connect');
            }
        }

        if (empty($errors)) {
            // Attempt to store minimal overrides by diffing with defaults.
            $diff = $this->diff_from_defaults($content, $this->get_default_content());
            update_option(self::OPTION_KEY, $diff);
            wp_safe_redirect(add_query_arg('settings-updated', 'true', menu_page_url('instep-community-connect', false)));
            exit;
        }

        set_transient('instep_cc_admin_errors', $errors, 30);
        wp_safe_redirect(menu_page_url('instep-community-connect', false));
        exit;
    }

    public function handle_reset_content(): void
    {
        if (!current_user_can('manage_options')) {
            wp_die(__('You do not have permission to perform this action.', 'instep-community-connect'));
        }

        delete_option(self::OPTION_KEY);
        wp_safe_redirect(add_query_arg('settings-updated', 'true', menu_page_url('instep-community-connect', false)));
        exit;
    }

    private function diff_from_defaults(array $content, array $defaults): array
    {
        $diff = [];

        foreach ($content as $key => $value) {
            $defaultValue = $defaults[$key] ?? null;

            if (is_array($value)) {
                if (is_array($defaultValue)) {
                    $childDiff = $this->diff_from_defaults($value, $defaultValue);
                    if (!empty($childDiff)) {
                        $diff[$key] = $childDiff;
                    }
                } else {
                    $diff[$key] = $value;
                }
            } else {
                if ($value !== $defaultValue) {
                    $diff[$key] = $value;
                }
            }
        }

        return $diff;
    }

    private function find_contact_field(array $content, string $title, string $field): string
    {
        foreach ($content['contact']['contactMethods'] ?? [] as $method) {
            if (($method['title'] ?? '') === $title) {
                return $method[$field] ?? '';
            }
        }

        return '';
    }

    private function replace_contact_field(array $content, string $title, string $field, string $value, ?string $action = null): array
    {
        if (!isset($content['contact']['contactMethods']) || !is_array($content['contact']['contactMethods'])) {
            return $content;
        }

        foreach ($content['contact']['contactMethods'] as $index => $method) {
            if (($method['title'] ?? '') === $title) {
                $content['contact']['contactMethods'][$index][$field] = $value;
                if ($action !== null) {
                    $content['contact']['contactMethods'][$index]['action'] = $action;
                }
            }
        }

        return $content;
    }
}
