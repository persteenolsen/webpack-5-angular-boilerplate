import { Component } from '@angular/core';

@Component({
    selector: 'home-page',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})


export class HomeComponent {

    
	 // Note: Works only using alias from webpack and not by tsconfig ! 
	 imageSrc = require('images/angular.png');
	 imageAlt = 'Angular';

 }
