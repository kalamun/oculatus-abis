<?php
/**
 * Blocks Initializer
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}


add_action( 'init', 'oa_doublexposure_register_block_type' );
add_action( 'wp_enqueue_scripts', 'oa_doublexposure_block_assets' );
add_action( 'enqueue_block_editor_assets', 'oa_doublexposure_block_assets' );
add_filter( 'block_categories', 'oa_doublexposure_init_blocks_category', 10, 2);

 
function oa_doublexposure_register_block_type()
{
	register_block_type(
		'kalamun/block-oa_doublexposure', [
			'style'         => 'oa_doublexposure-style-css',
			'editor_script' => 'oa_doublexposure-block-js',
		]
	);
}

function oa_doublexposure_block_assets()
{
	wp_enqueue_style(
		'kalamun-oa-doublexposure-style-css',
		plugins_url( 'doublexposure/style.css', dirname( __FILE__ ) ),
		is_admin() ? [ 'wp-editor' ] : null,
		filemtime( plugin_dir_path( __DIR__ ) . 'doublexposure/style.css' )
	);

	wp_enqueue_script(
		'kalamun-oa-doublexposure-block-js',
		plugins_url( 'doublexposure/block.js', dirname( __FILE__ ) ),
		[ 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'wp-data', 'wp-compose' ],
		filemtime( plugin_dir_path( __DIR__ ) . 'doublexposure/block.js' ),
		true
	);
}

function oa_doublexposure_init_blocks_category( $categories, $post )
{
	if( array_search( 'kalamun', array_column($categories, 'slug') ) )
		return $categories;

	return array_merge(
		$categories,
		[
			[
				'slug' => 'kalamun',
				'title' => 'kalamun',
			],
		]
	);
}
