<?php
/**
 * This index file is loaded on every page request.
 *
 * @package nateinaction
 * @subpackage lexi-theme
 */

// Prevent direct access.
defined( 'ABSPATH' ) || exit;

require_once get_stylesheet_directory() . '/acf/acf.php';

/**
 * Enqueue styles
 */
function lexi_enqueue_styles() {
	wp_enqueue_style( 'lexi_font', 'https://fonts.googleapis.com/css?family=Roboto:300,400,500', false, 'lexi_version' );
	wp_enqueue_style( 'lexi_css', get_template_directory_uri() . 'lexi_main_css', false, 'lexi_version' );
}
add_action( 'wp_enqueue_scripts', 'lexi_enqueue_styles' );

/**
 * Data on pageload
 *
 * This is the array of data provided to the react app on pageload
 */
function lexi_data_on_pageload() {
	$nav_menu_locations = get_nav_menu_locations();
	$nav_menu_items     = isset( $nav_menu_locations['primary'] ) ? wp_get_nav_menu_items( $nav_menu_locations['primary'] ) : [];
	return array(
		'endpoint'        => esc_url_raw( rest_url() ),
		'menu'            => $nav_menu_items,
		'nonce'           => wp_create_nonce( 'wp_rest' ),
		'fetchPostsStore' => lexi_fetch_posts_data(),
		'title'           => get_bloginfo( 'name' ),
	);
}

/**
 * Enqueue scripts
 */
function lexi_enqueue_scripts() {
	wp_enqueue_script( 'lexi_non_main', get_template_directory_uri() . 'lexi_non_main_js', false, 'lexi_version', true );
	wp_enqueue_script( 'lexi_main', get_template_directory_uri() . 'lexi_main_js', array( 'lexi_non_main' ), 'lexi_version', true );
	wp_localize_script(
		'lexi_main',
		'dataOnPageLoad',
		lexi_data_on_pageload()
	);
}
add_action( 'wp_enqueue_scripts', 'lexi_enqueue_scripts' );

/**
 * Get latest and oldest post dates
 */
function lexi_fetch_posts_data() {
	$post_args = array(
		'post_type'      => 'post',
		'posts_per_page' => 1,
		'offset'         => 0,
		'order_by'       => 'publish_date',
	);

	$post_args['order'] = 'ASC';
	$post_array         = get_posts( $post_args );
	$earliest_post_date = isset( $post_array[0] ) ? $post_array[0]->post_date : date( 'Y-m-d H:i:s' );

	$post_args['order'] = 'DESC';
	$post_array         = get_posts( $post_args );
	$latest_post_date   = isset( $post_array[0] ) ? $post_array[0]->post_date : date( 'Y-m-d H:i:s' );

	return array(
		'earliestPossible' => $earliest_post_date,
		'latestPossible'   => $latest_post_date,
	);
}

/**
 * Add some additional items to the header
 */
function additional_header_items() {
	echo '<link rel="shortcut icon" href="' . get_template_directory_uri() . '/favicon.ico">';
}
add_action( 'wp_head', 'additional_header_items' );

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
					'instructions' => 'This should work for all possible embeds: https://wordpress.org/support/article/embeds/',
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
					$cloudflare_stream_html = lexi_is_cloudflare_stream( $response['embed_url'] );
					if ($cloudflare_stream_html) {
						$response['embed_code'] = $cloudflare_stream_html;
					} else {
						$response['embed_code'] = wp_oembed_get( $response['embed_url'] );
					}
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

/**
 * Allow Cloudflare Stream embed
 */
function lexi_is_cloudflare_stream( $url ) {
	$pattern = '|^https://watch.cloudflarestream.com/([a-z0-9]+)|';
	if ( preg_match( $pattern, $url, $match ) ) {
		return "<iframe src='https://iframe.videodelivery.net/{$match[1]}' style='border: none;' height='720' width='1280' allow='accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;' allowfullscreen='true'></iframe>";
	}
	return false;
}
