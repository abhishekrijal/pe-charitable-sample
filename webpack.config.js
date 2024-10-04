// Load the default @wordpress/scripts config object
const defaultConfig = require( '@wordpress/scripts/config/webpack.config' );
const path = require( 'path' );
module.exports = {
    ...defaultConfig,
	mode: 'production',
	optimization: {
		usedExports: true,
	},
    entry: {
        blocks: path.resolve( __dirname, 'src/index.js' ),
        page: path.resolve( __dirname, 'src/menuPage/index.jsx' ),
    },
    output: {
		...defaultConfig.output,
		filename: '[name].js',
		path: path.resolve( __dirname, 'build' ),
	},
}