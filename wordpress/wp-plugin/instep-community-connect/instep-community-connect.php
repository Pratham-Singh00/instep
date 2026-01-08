<?php
/**
 * Plugin Name:       In Step Community Connect
 * Description:       Serves the In Step Community Connect front-end and exposes WordPress-managed content to the React app.
 * Version:           0.1.0
 * Author:            In Step Community Connect Team
 * Requires at least: 6.0
 * Requires PHP:      7.4
 * License:           GPL-2.0-or-later
 * Text Domain:       instep-community-connect
 */

if (!defined('ABSPATH')) {
    exit;
}

define('INSTEP_CC_PLUGIN_FILE', __FILE__);

define('INSTEP_CC_PLUGIN_DIR', plugin_dir_path(__FILE__));

define('INSTEP_CC_PLUGIN_URL', plugin_dir_url(__FILE__));

define('INSTEP_CC_VERSION', '0.1.0');

require_once INSTEP_CC_PLUGIN_DIR . 'includes/class-instep-community-connect.php';

Instep_Community_Connect::instance();
