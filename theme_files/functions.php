<?php
/**
 * This index file is loaded on every page request.
 *
 * @package nateinaction/lexi-theme
 */

// Prevent direct access.
defined( 'ABSPATH' ) || exit;

require_once get_stylesheet_directory() . '/acf/acf.php';

/**
 * Enqueue styles
 */
function lexi_enqueue_styles() {
	wp_enqueue_style( 'lexi_font', 'https://fonts.googleapis.com/css?family=Roboto:300,400,500', false, '0.10.0' );
	wp_enqueue_style( 'lexi_css', get_template_directory_uri() . '/style.css', false, '0.10.0' );
}
add_action( 'wp_enqueue_scripts', 'lexi_enqueue_styles' );

/**
 * Enqueue scripts
 */
function lexi_enqueue_scripts() {
	wp_enqueue_script( 'lexi_ui', get_template_directory_uri() . '/ui.js', false, '0.9.13', true );
	wp_localize_script(
		'lexi_ui',
		'lexiConfig',
		array(
			'endpoint' => esc_url_raw( rest_url() ),
			'menu'     => wp_json_encode( wp_get_nav_menu_items( get_nav_menu_locations()['primary'] ) ),
			'nonce'    => wp_create_nonce( 'wp_rest' ),
			'timeline' => lexi_get_timeline_meta(),
			'title'    => get_bloginfo( 'name' ),
		)
	);
}
add_action( 'wp_enqueue_scripts', 'lexi_enqueue_scripts' );

/**
 * Get latest and oldest post dates
 */
function lexi_get_timeline_meta() {
	global $wpdb;
	return array(
		'oldest' => $wpdb->get_row(
			"SELECT post_date FROM {$wpdb->posts} WHERE post_type = 'post' AND post_status = 'publish' ORDER BY post_date ASC"
		),
		'latest' => $wpdb->get_row(
			"SELECT post_date FROM {$wpdb->posts} WHERE post_type = 'post' AND post_status = 'publish' ORDER BY post_date DESC"
		),
	);
}

/**
 * Don't allow pinch-to-zoom on mobile
 */
function viewport_meta() {
	echo '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no">';
}
add_action( 'wp_head', 'viewport_meta' );

/**
 * Register primary menu
 */
function lexi_menu() {
	register_nav_menu( 'primary', __( 'Primary Menu' ) );
}
add_action( 'init', 'lexi_menu' );

/**
 * On upload, store many image sizes for easier scaling on mobile
 */
function lexi_image_sizes() {
	add_image_size( '200', 200 );
	add_image_size( '400', 400 );
	add_image_size( '600', 600 );
	add_image_size( '800', 800 );
	add_image_size( '1200', 1200 );
	add_image_size( '1400', 1400 );
	add_image_size( '1600', 1600 );
	add_image_size( '1800', 1800 );
	add_image_size( '2000', 2000 );
}
add_action( 'after_setup_theme', 'lexi_image_sizes' );

// Add support for featured images in posts.
add_theme_support( 'post-thumbnails' );

/**
 * ACF settings path
 */
function lexi_acf_settings_path() {
	return get_stylesheet_directory() . '/acf/';
}

/**
 * ACF settings dir
 */
function lexi_acf_settings_dir() {
	return get_stylesheet_directory_uri() . '/acf/';
}

add_filter( 'acf/settings/path', 'lexi_acf_settings_path' );
add_filter( 'acf/settings/dir', 'lexi_acf_settings_dir' );
add_filter( 'acf/settings/show_admin', '__return_false' );

/**
 * On theme activation, setup custom fields
 */
function lexi_acf_setup() {
	acf_add_local_field_group(
		array(
			'key'                   => 'group_5991f27225d2c',
			'title'                 => 'Lexi Theme',
			'fields'                => array(
				array(
					'key'          => 'field_5991f27df0d11',
					'label'        => 'Link to embed',
					'name'         => 'link_to_embed',
					'type'         => 'url',
					'instructions' => 'This should work for all possible embeds: https://codex.wordpress.org/Embeds',
					'placeholder'  => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
				),
			),
			'location'              => array(
				array(
					array(
						'param'    => 'post_type',
						'operator' => '==',
						'value'    => 'post',
					),
				),
			),
			'menu_order'            => 0,
			'position'              => 'normal',
			'style'                 => 'default',
			'label_placement'       => 'top',
			'instruction_placement' => 'label',
			'hide_on_screen'        => '',
			'active'                => 1,
			'description'           => '',
		)
	);
}
add_action( 'acf/init', 'lexi_acf_setup' );

/**
 * Add embed form to post endpoint
 */
function lexi_add_embed() {
	register_rest_field(
		'post',
		'lexi_embed',
		array(
			'get_callback' => function( $post_arr ) {
				$response = array(
					'embed_url' => get_field( 'link_to_embed', $post_arr['id'] ),
				);
				$response['embed'] = ! empty( $response['embed_url'] );
				if ( $response['embed'] ) {
					$response['embed_code'] = wp_oembed_get( $response['embed_url'] );
				}
				return (array) $response;
			},
			'schema'       => array(
				'description' => __( 'Link to embed.' ),
				'type'        => 'string',
			),
		)
	);
};
add_action( 'rest_api_init', 'lexi_add_embed' );
