const paths = require('./paths')
const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')

const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')

module.exports = merge(common, {
	
   mode: 'production',
   devtool: false,
  
   output: {
     path: paths.build,
     publicPath: '/',
    	
	 // For splitting the ES5 bundle in chunks
	 filename: 'js/[name].[contenthash].js',
     chunkFilename: 'js/[id].[contenthash].chunk.js'
  },
    
   // Production: Magic happen here transpiling to es5 to partly support older browser like IE11
   target: ['web', 'es5'], 
  
   plugins: [
  
    // Extracts CSS into separate files
    // Note: style-loader is for development, MiniCssExtractPlugin is for production
    new MiniCssExtractPlugin({
		
      filename: 'styles/[name].[contenthash].css',
      chunkFilename: '[id].css',
	  
    }),
  ],
  
  module: {
	  
    rules: [
     
	    // Note: For now both the global imported scss file in the module component and the locals scss files 
		// in the differents components are handles in rules in webpack.common.js 
	    /* {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
			 
            loader: 'css-loader',
            options: {
              importLoaders: 2,
              sourceMap: false,
            },
          },
          'postcss-loader',
          'sass-loader',
        ],
      }, */
	    
	  
    ],
  },
  
  optimization: {
    minimize: true,
    minimizer: [new CssMinimizerPlugin(), "..."],
	
	 // Extracts js into separate files / chunks
	 splitChunks: {
            chunks: 'all',
			
			// Sizes of the js chunks will be > 50 KB and < 500 KB if possible
			// MinSize default is 20 KB I belive
			 minSize: 50000,
			 maxSize: 500000
        },
	
    // Once your build outputs multiple chunks, this option will ensure they share the webpack runtime
    // instead of having their own. This also helps with long-term caching, since the chunks will only
    // change when actual code changes, not the webpack runtime.
    runtimeChunk: {
      name: 'runtime',
    },
   // runtimeChunk: 'single',
  },
  
  // Watching / warning  if a a file in the entrypoint or a chunk have a size > than 512 KB
  // The above maxSize by splitChunks of 500 KB take care 
  performance: {
    hints: false,
    maxEntrypointSize: 512000,
    maxAssetSize: 512000,
  },
})
