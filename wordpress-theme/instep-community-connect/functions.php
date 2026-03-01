<?php
/**
 * In Step Community Connect Theme Functions
 *
 * @package InStepCommunityConnect
 * @since 1.0.0
 */

// Ensure PHP 8.3 or higher
if (version_compare(PHP_VERSION, '8.3', '<')) {
    add_action('admin_notices', function () {
        echo '<div class="error"><p>';
        printf(
            /* translators: %s: Required PHP version */
            esc_html__('In Step Community Connect theme requires PHP 8.3 or higher. You are running version %s. Please upgrade PHP.', 'instep-community-connect'),
            esc_html(PHP_VERSION)
        );
        echo '</p></div>';
    });
    return;
}

if (!defined('ABSPATH')) {
    exit;
}

define('INSTEP_THEME_VERSION', '7.6.0');
define('INSTEP_THEME_DIR', get_template_directory());
define('INSTEP_THEME_URI', get_template_directory_uri());

// Load the main theme class
require_once INSTEP_THEME_DIR . '/includes/class-instep-theme.php';

// Initialize the theme
Instep_Theme::instance();

/**
 * Flush rewrite rules on theme activation
 */
function instep_theme_activated(): void
{
    Instep_Theme::instance();
    flush_rewrite_rules();
}
add_action('after_switch_theme', 'instep_theme_activated');

/**
 * Theme setup
 */
function instep_theme_setup(): void
{
    // Make theme available for translation
    load_theme_textdomain('instep-community-connect', INSTEP_THEME_DIR . '/languages');

    // Add default posts and comments RSS feed links to head
    add_theme_support('automatic-feed-links');

    // Let WordPress manage the document title
    add_theme_support('title-tag');

    // Enable support for Post Thumbnails
    add_theme_support('post-thumbnails');

    // Enable support for responsive embeds
    add_theme_support('responsive-embeds');

    // Add support for HTML5 markup
    add_theme_support('html5', [
        'search-form',
        'comment-form',
        'comment-list',
        'gallery',
        'caption',
        'style',
        'script',
    ]);

    // Add theme support for custom logo
    add_theme_support('custom-logo', [
        'height'      => 100,
        'width'       => 400,
        'flex-height' => true,
        'flex-width'  => true,
    ]);

    // Register navigation menus
    register_nav_menus([
        'primary' => esc_html__('Primary Menu', 'instep-community-connect'),
        'footer'  => esc_html__('Footer Menu', 'instep-community-connect'),
    ]);
}
add_action('after_setup_theme', 'instep_theme_setup');

/**
 * Set content width
 */
function instep_content_width(): void
{
    $GLOBALS['content_width'] = apply_filters('instep_content_width', 1200);
}
add_action('after_setup_theme', 'instep_content_width', 0);

/**
 * Enqueue theme styles and scripts
 */
function instep_enqueue_assets(): void
{
    // Enqueue theme stylesheet (required for WordPress theme detection)
    wp_enqueue_style(
        'instep-theme-style',
        get_stylesheet_uri(),
        [],
        INSTEP_THEME_VERSION
    );

    // Enqueue responsive styles
    wp_enqueue_style(
        'instep-responsive-style',
        INSTEP_THEME_URI . '/responsive.css',
        ['instep-theme-style'],
        INSTEP_THEME_VERSION
    );

    // Enqueue React app assets
    $theme = Instep_Theme::instance();
    $theme->enqueue_react_app();
}
add_action('wp_enqueue_scripts', 'instep_enqueue_assets');

/**
 * Add viewport meta tag for responsive design
 */
function instep_viewport_meta(): void
{
    echo '<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">';
}
add_action('wp_head', 'instep_viewport_meta', 1);

/**
 * Add baseline SEO metadata and structured data for crawlers.
 */
function instep_output_seo_meta(): void
{
    $site_name = get_bloginfo('name') ?: 'InStep PC';
    $title = wp_get_document_title() ?: $site_name;
    $og_image = trailingslashit(INSTEP_THEME_URI) . 'assets/logo.png';
    
    // Handle blog posts specifically
    if (is_singular('post')) {
        $post = get_post();
        $description = $post->post_excerpt ?: wp_trim_words(strip_tags($post->post_content), 30);
        $canonical = home_url('/blog/' . $post->post_name);
        
        // Get featured image if available
        if (has_post_thumbnail($post->ID)) {
            $thumbnail_id = get_post_thumbnail_id($post->ID);
            $thumbnail_url = wp_get_attachment_image_url($thumbnail_id, 'large');
            if ($thumbnail_url) {
                $og_image = $thumbnail_url;
            }
        }
        
        // Get author info
        $custom_author = get_post_meta($post->ID, '_instep_custom_author', true);
        $author_name = $custom_author ?: get_the_author_meta('display_name', $post->post_author);
        
        echo '<meta name="description" content="' . esc_attr($description) . '">';
        echo '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">';
        echo '<link rel="canonical" href="' . esc_url($canonical) . '">';

        echo '<meta property="og:type" content="article">';
        echo '<meta property="og:site_name" content="' . esc_attr($site_name) . '">';
        echo '<meta property="og:title" content="' . esc_attr($post->post_title) . '">';
        echo '<meta property="og:description" content="' . esc_attr($description) . '">';
        echo '<meta property="og:url" content="' . esc_url($canonical) . '">';
        echo '<meta property="og:image" content="' . esc_url($og_image) . '">';
        echo '<meta property="og:locale" content="en_US">';
        echo '<meta property="article:published_time" content="' . esc_attr(get_the_date('c', $post)) . '">';
        echo '<meta property="article:modified_time" content="' . esc_attr(get_the_modified_date('c', $post)) . '">';
        echo '<meta property="article:author" content="' . esc_attr($author_name) . '">';

        echo '<meta name="twitter:card" content="summary_large_image">';
        echo '<meta name="twitter:title" content="' . esc_attr($post->post_title) . '">';
        echo '<meta name="twitter:description" content="' . esc_attr($description) . '">';
        echo '<meta name="twitter:image" content="' . esc_url($og_image) . '">';

        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'BlogPosting',
            'headline' => $post->post_title,
            'image' => $og_image,
            'author' => [
                '@type' => ($author_name === 'In Step Team' || $author_name === 'In Step PC Team') ? 'Organization' : 'Person',
                'name' => $author_name,
            ],
            'publisher' => [
                '@type' => 'Organization',
                'name' => 'InStep PC',
                'logo' => [
                    '@type' => 'ImageObject',
                    'url' => trailingslashit(INSTEP_THEME_URI) . 'assets/logo.png'
                ]
            ],
            'url' => $canonical,
            'datePublished' => get_the_date('c', $post),
            'dateModified' => get_the_modified_date('c', $post),
            'description' => $description,
            'mainEntityOfPage' => [
                '@type' => 'WebPage',
                '@id' => $canonical
            ]
        ];

        echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>';
        
    } else {
        // Default homepage/other pages
        $description = 'Professional mental health therapy, counseling, and group programs in Fairfax, Northern Virginia and the DC area.';
        $canonical = is_front_page()
            ? home_url('/')
            : home_url(add_query_arg([], $GLOBALS['wp']->request ?? ''));

        echo '<meta name="description" content="' . esc_attr($description) . '">';
        echo '<meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1">';
        echo '<link rel="canonical" href="' . esc_url($canonical) . '">';

        echo '<meta property="og:type" content="website">';
        echo '<meta property="og:site_name" content="' . esc_attr($site_name) . '">';
        echo '<meta property="og:title" content="' . esc_attr($title) . '">';
        echo '<meta property="og:description" content="' . esc_attr($description) . '">';
        echo '<meta property="og:url" content="' . esc_url($canonical) . '">';
        echo '<meta property="og:image" content="' . esc_url($og_image) . '">';
        echo '<meta property="og:locale" content="en_US">';

        echo '<meta name="twitter:card" content="summary_large_image">';
        echo '<meta name="twitter:title" content="' . esc_attr($title) . '">';
        echo '<meta name="twitter:description" content="' . esc_attr($description) . '">';
        echo '<meta name="twitter:image" content="' . esc_url($og_image) . '">';

        $schema = [
            '@context' => 'https://schema.org',
            '@type' => 'MedicalClinic',
            'name' => 'InStep PC',
            'url' => home_url('/'),
            'image' => $og_image,
            'email' => 'admin@insteppc.com',
            'telephone' => '+1-703-876-8480',
            'address' => [
                '@type' => 'PostalAddress',
                'streetAddress' => '8500 Executive Park Avenue, Suite 204',
                'addressLocality' => 'Fairfax',
                'addressRegion' => 'VA',
                'postalCode' => '22031',
                'addressCountry' => 'US',
            ],
            'sameAs' => [
                'https://www.facebook.com/Insteppc/',
            ],
        ];

        echo '<script type="application/ld+json">' . wp_json_encode($schema, JSON_UNESCAPED_SLASHES | JSON_UNESCAPED_UNICODE) . '</script>';
    }
}
add_action('wp_head', 'instep_output_seo_meta', 5);

/**
 * Disable WordPress automatic updates.
 *
 * Note: PHP version updates are managed by the hosting provider and cannot be
 * controlled from WordPress/theme code.
 */
function instep_disable_auto_updates(): void
{
    add_filter('automatic_updater_disabled', '__return_true');
    add_filter('auto_update_core', '__return_false');
    add_filter('auto_update_plugin', '__return_false');
    add_filter('auto_update_theme', '__return_false');
    add_filter('auto_update_translation', '__return_false');
}
add_action('init', 'instep_disable_auto_updates');
