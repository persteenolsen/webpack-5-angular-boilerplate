const pathtoresolve = require('path');
const paths = require('./paths')

const webpack = require('webpack')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');


module.exports = {
	
  // Where webpack looks to start building the bundle and include polyfill
  entry: [ paths.src + '/main.ts'],

  // Where webpack outputs the assets and bundles
  output: {
    path: paths.build,
    filename: '[name].bundle.js',
    publicPath: '/',
  },
    
    
  resolve: {
        extensions: [ '.ts', '.js' ],
        alias: {
            'components': pathtoresolve.resolve(__dirname, '../src/app/components/'),
			'images': pathtoresolve.resolve(__dirname, '../src/images/'),
		    'styles': pathtoresolve.resolve(__dirname, '../src/styles/'),
		 }
    },
	

  // Customize the webpack build process
  plugins: [
    
	
	new FriendlyErrorsPlugin(),
    	
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),
	
	
    // Copies files from target to destination folder
    new CopyWebpackPlugin({
      patterns: [
        {
          from: paths.public,
          to: 'assets',
          globOptions: {
            ignore: ['*.DS_Store'],
          },
        },
      ],
    }),

    // Generates an HTML file from a template
    // Generates deprecation warning: https://github.com/jantimon/html-webpack-plugin/issues/1501
    new HtmlWebpackPlugin({
      title: 'webpack Boilerplate',
      favicon: paths.src + '/images/favicon.png',
      template: paths.src + '/index.html', // template file
      filename: 'index.html', // output file
    }),
	
	
  ],

  // Determine how modules within the project are treated
  module: {
    rules: [
	    
      // Habling TypeScript / Angular files here
       {
          test: /\.ts$/,
          use: ['ts-loader', 'angular2-template-loader']
       },
       {
          test: /\.html$/,
          use: 'html-loader'
       },

      // Styles: Inject CSS into the head with source maps
     /* {
        test: /\.(scss|css)$/,
        use: [
          'style-loader',
          {loader: 'css-loader', options: {sourceMap: true, importLoaders: 1}},
          {loader: 'postcss-loader', options: {sourceMap: true}},
          {loader: 'sass-loader', options: {sourceMap: true}},
        ],
      }, */
     
	 // Note: Instead of the code block above 
	  {
        test: /\.(scss|css)$/,
        use: ['to-string-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
	  
      // Images: Copy image files to build folder
      {test: /\.(?:ico|gif|png|jpg|jpeg)$/i, type: 'asset/resource'},

      // Fonts and SVGs: Inline files
      {test: /\.(woff(2)?|eot|ttf|otf|svg|)$/, type: 'asset/inline'},
	  
	   // Note: Needs to be false for avoid the compiler warning:
	   // System.import() is deprecated and will be removed soon. Use import() instead.
       {
         test: /[\/\\]@angular[\/\\].+\.js$/,
		 parser: { system: false }
       },
		
    ],
  },
}
