<?php
/**
 * The header for our theme
 *
 * @package InStepCommunityConnect
 * @since 1.0.0
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
    <meta charset="<?php bloginfo('charset'); ?>">
    <script>
        window.INSTEP_THEME_URI = '<?php echo esc_url(INSTEP_THEME_URI); ?>';
    </script>
    <?php wp_head(); ?>
</head>
<body <?php body_class(); ?>>
<?php wp_body_open(); ?>
<div id="page" class="site">
    <a class="skip-link screen-reader-text" href="#instep-community-connect-root">
        <?php esc_html_e('Skip to content', 'instep-community-connect'); ?>
    </a>
