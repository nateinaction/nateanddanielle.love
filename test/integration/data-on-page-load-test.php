<?php
/**
 * Unit tests determines if WordPress core functions exist
 *
 * @package nateinaction/nateanddanielle.love
 */

/**
 * Test that data-on-page-load.json contract matches what theme injects on page load
 */
class DataOnPageLoadTest extends \WP_UnitTestCase {

	/**
	 * Setup
	 *
	 * Mock some items to match nateanddanielle.love to satisfy some react local dev reqs. This probably shouldn't be a thing.
	 */
	public function setUp() {
		parent::setUp();

		// Setup site options.
		update_option( 'blogname', 'Local Development Site' );
		update_option( 'home', 'https://nateanddanielle.love/' );
		$this->set_permalink_structure( '/%postname%/' );

		// Create posts.
		$this->factory->post->create(
			array(
				'import_id'  => 1,
				'post_title' => 'first-post',
				'post_date'  => '2013-09-15T15:37:25',
			)
		);
		$this->factory->post->create(
			array(
				'import_id'  => 2,
				'post_title' => 'some-post',
				'post_date'  => '2016-01-01T00:00:00',
			)
		);
		$this->factory->post->create(
			array(
				'import_id'  => 3,
				'post_title' => 'last-post',
				'post_date'  => '2018-12-15T20:02:17',
			)
		);

		// Create menu items.
		$menu_id    = wp_create_nav_menu( 'some menu' );
		$menu_items = array(
			[
				'menu-item-object-id' => 4,
				'menu-item-title'     => 'Home',
				'menu-item-url'       => 'http://localhost:3000',
				'menu-item-type'      => 'custom',
				'menu-item-status'    => 'publish',
			],
			[
				'menu-item-object-id' => 5,
				'menu-item-title'     => 'About Me',
				'menu-item-url'       => 'https://nategay.me',
				'menu-item-type'      => 'custom',
				'menu-item-status'    => 'publish',
			],
		);
		foreach ( $menu_items as $args ) {
			wp_update_nav_menu_item( $menu_id, 0, $args );
		}
		$menu_obj             = wp_get_nav_menu_object( $menu_id );
		$locations            = get_nav_menu_locations();
		$locations['primary'] = $menu_obj->term_id;
		set_theme_mod( 'nav_menu_locations', $locations );
	}

	/**
	 * Test lexi_data_on_pageload
	 */
	public function test_lexi_data_on_pageload() {
		$expected_json    = file_get_contents( __DIR__ . '/../files/data-on-page-load.json' );
		$expected_php_var = json_decode( $expected_json, true );
		$data_on_pageload = json_decode( json_encode( lexi_data_on_pageload() ), true );

		$this->assertEquals( $data_on_pageload['endpoint'], $expected_php_var['endpoint'] );
		$this->assertEquals( $data_on_pageload['title'], $expected_php_var['title'] );
		$this->assertEquals( $data_on_pageload['menu'][0]['title'], $expected_php_var['menu'][0]['title'] );
		$this->assertEquals( $data_on_pageload['menu'][1]['title'], $expected_php_var['menu'][1]['title'] );
		$this->assertEquals( $data_on_pageload['menu'][0]['url'], $expected_php_var['menu'][0]['url'] );
		$this->assertEquals( $data_on_pageload['menu'][1]['url'], $expected_php_var['menu'][1]['url'] );
		$this->assertArrayHasKey( 'nonce', $data_on_pageload );
		$this->assertArrayHasKey( 'nonce', $expected_php_var );
		$this->assertEquals( $data_on_pageload['fetchPostsStore']['earliestPossible'], $expected_php_var['fetchPostsStore']['earliestPossible'] );
		$this->assertEquals( $data_on_pageload['fetchPostsStore']['latestPossible'], $expected_php_var['fetchPostsStore']['latestPossible'] );
	}
}
