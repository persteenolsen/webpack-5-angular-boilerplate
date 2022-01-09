const paths = require('./paths')
const pathtoresolve = require('path');

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

module.exports = merge(common, {
	
  // Set the mode to development or production
  mode: 'development',

  // Control how source maps are generated
  devtool: 'inline-source-map',
  
  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  }, 
    
    
  // Enable: It is possible testing in IE 11, but reload / replacement will break due to a bug in webpack 5 !
  // Disable: It is possible to use hot relad / replacement but not using IE 11 !
  // target: ['web', 'es5'], 

  // Spin up a server for quick development
  devServer: {
	  
    historyApiFallback: true,
	
	// NOTE: Using webpack-dev-server > 4 and webpack-cli > 4 contentBase needs to be replaced by static !!
    // contentBase: paths.build,
    static: paths.build,
	   
    open: true,
    compress: true,
	
	// Note: In this webpack version version it is already enabled by default 
    hot: true,
    port: 8080,
  },
   
    
  plugins: [
    
	// Note: In this webpack version version it is already enabled by default 
	// Note: Only update what has changed on hot reload 
	// Require the statement "module.hot.accept();" in the root main.ts !
    new webpack.HotModuleReplacementPlugin(),
	
	// Note: Maybe not needed beacuse the rule in webpack.common.js take care 
	// workaround for warning: Critical dependency: the request of a dependency is an expression
     new webpack.ContextReplacementPlugin( /\@angular(\\|\/)core(\\|\/)fesm5/, pathtoresolve.resolve(__dirname, './src' )),
	
	
  ],
})
