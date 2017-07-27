<?php

function lexi_enqueue_style() {
  wp_enqueue_style( 'lexi_font', 'https://fonts.googleapis.com/css?family=Roboto:300,400,500', false );
	wp_enqueue_style( 'lexi_css', get_template_directory_uri() . '/style.css', false );
}

function lexi_enqueue_script() {
	wp_enqueue_script( 'lexi_ui', get_template_directory_uri() . '/ui.js', false, false, true );
}

add_action( 'wp_enqueue_scripts', 'lexi_enqueue_style' );
add_action( 'wp_enqueue_scripts', 'lexi_enqueue_script' );

function viewport_meta() {
  echo '<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, maximum-scale=1.0, user-scalable=no">';
}
add_action('wp_head', 'viewport_meta');
