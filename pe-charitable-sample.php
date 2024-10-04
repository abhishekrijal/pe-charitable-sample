<?php
/**
 * Plugin Name:       PE Charitable Sample
 * Description:       Example block scaffolded with Create Block tool.
 * Requires at least: 6.1
 * Requires PHP:      7.0
 * Version:           0.1.0
 * Author:            PushEngage
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       pe-charitable-sample
 *
 * @package PECharitableSample
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main PE Charitable Sample class.
 */
class PE_Charitable_Sample {

	/**
	 * Constructor.
	 */
	public function __construct() {
		// Check if Charitable plugin is active.
		if ( ! class_exists( 'Charitable' ) ) {
			add_action( 'admin_notices', [ $this, 'charitable_missing_notice' ] );
			return;
		}

		// Hooks.
		add_action( 'charitable_process_donation_offline', [ $this, 'send_donation_notification' ], 10, 3 );
		add_action( 'charitable_donation_form_donor_fields_after', [ $this, 'add_pushengage_field' ] );
		add_action( 'admin_menu', [ $this, 'add_menu_page' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'enqueue_admin_assets' ] );
		add_action( 'wp_enqueue_scripts', [ $this, 'enqueue_frontend_assets' ] );
		add_action( 'charitable_builder_save_campaign', [ $this, 'save_campaign_data' ], 10, 4 );
	}

	/**
	 * Admin notice if Charitable is not installed.
	 */
	public function charitable_missing_notice() {
		?>
		<div class="notice notice-error">
			<p>
				<?php esc_html_e( 'PE Charitable Sample Addon requires the WP Charitable plugin to be active. Please install and activate WP Charitable first.', 'pe-charitable-sample' ); ?>
			</p>
		</div>
		<?php
	}

	/**
	 * Send donation notification after a donation is processed.
	 *
	 * @param bool                        $success            Whether the donation was successful.
	 * @param int                         $donation_id        The ID of the donation.
	 * @param Charitable_Donation_Processor $donation_processor Donation processor object.
	 */
	public function send_donation_notification( $success, $donation_id, $donation_processor ) {
		if ( ! $success || ! function_exists( 'pushengage' ) ) {
			return;
		}

		if ( ! pushengage()->is_site_connected() ) {
			return;
		}

		$campaign_name = $donation_processor->get_campaign_names();
		$donation_data = $donation_processor->get_campaign_donations_data();
        $campaign_id   = $donation_processor->get_campaign()->get_campaign_id();

        $campaign_segment = get_post_meta( $campaign_id, 'pe_charitable_segment', true );

        if ( empty( $campaign_segment ) ) {
            return;
        }

		$notification_data = [
			'notification_title'   => sprintf( __( 'Donation Received for %s', 'pe-charitable-sample' ), esc_html( $campaign_name ) ),
			'notification_message' => sprintf( __( 'New donation received for %s of %s %s', 'pe-charitable-sample' ), esc_html( $campaign_name ), wp_kses_post( charitable_get_currency() ), esc_html( $donation_data[0]['amount'] ) ),
			'notification_url'     => get_permalink( $donation_processor->get_campaign()->get_campaign_id() ),
			'status'               => 'sent',
		];

		$notification_data['notification_criteria'] = [
			'filter' => [
				'value' => [
					[
						[
							'field' => 'segments',
							'op'    => 'all',
							'value' => [ $campaign_segment['segment_id'] ],
						],
					],
				],
			],
		];

		$notification = pushengage()->send_notification( $notification_data );

        return $notification;
	}

	/**
	 * Add PushEngage field to the donation form.
	 */
	public function add_pushengage_field() {
		?>
		<div class="pe-charitable-sample-pushengage-field">
			<label for="pushengage_send_updates">
				<?php esc_html_e( 'Send updates via push notifications.', 'pe-charitable-sample' ); ?>
			</label>
			<input data-segment="<?php the_title(); ?>" type="checkbox" name="pushengage_send_updates" id="pushengage_send_updates">
		</div>
		<?php
	}

	/**
	 * Add menu page in the WordPress dashboard.
	 */
	public function add_menu_page() {
		add_menu_page(
			__( 'PE Charitable Sample', 'pe-charitable-sample' ),
			__( 'PE Charitable Sample', 'pe-charitable-sample' ),
			'manage_options',
			'pe-charitable-sample',
			[ $this, 'display_admin_page' ],
			'dashicons-admin-generic',
			6
		);
	}

	/**
	 * Admin page display callback.
	 */
	public function display_admin_page() {
		?>
            <div id="wp-charitable-sample-page"></div>
		<?php
	}

	/**
	 * Enqueue admin assets.
	 */
	public function enqueue_admin_assets() {
		$asset_deps = include plugin_dir_path( __FILE__ ) . 'build/page.asset.php';

		wp_enqueue_script(
			'pe-charitable-sample-js',
			plugins_url( 'build/page.js', __FILE__ ),
			$asset_deps['dependencies'],
			$asset_deps['version'],
			true
		);

		wp_enqueue_style(
			'pe-charitable-sample-css',
			plugins_url( 'build/page.css', __FILE__ ),
			[],
			$asset_deps['version'],
			'all'
		);
	}

	/**
	 * Enqueue frontend assets.
	 */
	public function enqueue_frontend_assets() {
		wp_enqueue_script(
			'pe-charitable-sample-frontend-js',
			plugins_url( 'assets/js/pushengage-asset.js', __FILE__ ),
			[ 'jquery' ],
			'1.0',
			true
		);
	}

	/**
	 * Save campaign data.
	 *
	 * @param int $campaign_id The ID of the campaign.
	 * @param array $campaign_settings_v2 The campaign settings.
	 * @param WP_Post $campaign_post The campaign post object.
	 * @param bool $is_preview Whether it's a preview.
	 */
	public function save_campaign_data( $campaign_id, $campaign_settings_v2, $campaign_post, $is_preview ) {
        $campaign_name = $campaign_settings_v2['title'];
        $segments      = pushengage()->get_segments();

		if ( ! is_wp_error( $segments ) && ! empty( $segments['data'] ) ) {
			$segment = array_filter( $segments['data'], function( $segment ) use ( $campaign_name ) {
				return $segment['segment_name'] === $campaign_name;
			});

			if ( empty( $segment ) ) {
                $new_segment = pushengage()->create_segment(
                    [ 'segment_name' => esc_html( $campaign_name ) ]
                );
                if ( ! is_wp_error( $new_segment ) && ! empty( $new_segment['data'] ) ) {
                    update_post_meta( $campaign_id, 'pe_charitable_segment', $new_segment['data'] );
                }
            }
        }
	}
}

/**
 * Initialize the plugin.
 */
function pe_charitable_sample_init() {
	$pe_charitable_sample = new PE_Charitable_Sample();
}
add_action( 'plugins_loaded', 'pe_charitable_sample_init' );
