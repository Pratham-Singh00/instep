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

define('INSTEP_THEME_VERSION', '1.61.0');
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
