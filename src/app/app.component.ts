import { Component } from '@angular/core';

// Note: Maybe not nessesary for using require to load the image !!
declare const require: any;


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})

export class AppComponent {
    
	// This message will be displayed on every pages at the bottom
    message = 'A single page application made in Angular';
			
	// Note: This does not work !!
	//imageSrc = '../images/favicon.png'; 
	
    // The following "tricks" is Webpack and not Angular cli !	
    // Note: Without using "esModule: false" in webpack.common.js an image [src] will need require + .default suffix to load !
	// - esModule was introduced in file-loader 4.3 and from 5.0 set to true by default 
	// imageSrc = require('../images/favicon.png').default;
		
	// Note: Using "esModule: false" in webpack.common.js an image [src] will load just by require 
	//(in the ts component) or without require ( component html-template) !
	// - esModule was introduced in file-loader 4.3 and from 5.0 set to true by default 
	imageSrc = require('../images/favicon.png');
	imageAlt = 'Webpack';
	
}