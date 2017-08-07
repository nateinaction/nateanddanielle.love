<?php

function lexi_enqueue_styles() {
  wp_enqueue_style( 'lexi_font', 'https://fonts.googleapis.com/css?family=Roboto:300,400,500', false );
	wp_enqueue_style( 'lexi_css', get_template_directory_uri() . '/style.css', false, '0.5.1' );
}
add_action( 'wp_enqueue_scripts', 'lexi_enqueue_styles' );

function lexi_enqueue_scripts() {
	wp_enqueue_script( 'lexi_ui', get_template_directory_uri() . '/ui.js', false, '0.5.1', true );
  wp_localize_script( 'lexi_ui', 'lexiConfig', array(
      'endpoint' => esc_url_raw( rest_url() ),
      'nonce' => wp_create_nonce( 'wp_rest' ),
      'title' => get_bloginfo( 'name' ),
      'menu' => json_encode( wp_get_nav_menu_items( 'primary' ) )
  ));
}
add_action( 'wp_enqueue_scripts', 'lexi_enqueue_scripts' );

function viewport_meta() {
  echo '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no">';
}
add_action('wp_head', 'viewport_meta');

// add support for a primary menu
function lexi_menu() {
  register_nav_menu('primary',__( 'Primary Menu' ));
}
add_action( 'init', 'lexi_menu' );

// add support for smart image resizing
function lexi_image_sizes() {
  add_image_size( '200', 200 );
  add_image_size( '400', 400 );
  add_image_size( '600', 600 );
  add_image_size( '800', 800 );
  add_image_size( '1200', 1200 );
}
add_action( 'after_setup_theme', 'lexi_image_sizes' );

// add support for featured images in posts
add_theme_support( 'post-thumbnails' );

/*
* REST API
*/
//require(plugin_dir_path(__FILE__) . 'api.php');
