import { render } from '@wordpress/element';
import MenuPage from './page';

( function () {
	const app = document.getElementById( 'wp-charitable-sample-page' );

	function renderApp() {
		if ( null !== app ) {
			render( <MenuPage />, app );
		}
	}

	document.addEventListener( 'DOMContentLoaded', renderApp );
}() );
