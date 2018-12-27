<?php
/**
 * This index file is loaded on every page request.
 *
 * @package nateinaction/lexi-theme
 */

// Prevent direct access.
defined( 'ABSPATH' ) || exit;

wp_head();
echo '<div id="root"></div>';
wp_footer();
