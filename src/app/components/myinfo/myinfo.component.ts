import { Component } from '@angular/core';

@Component({
    selector: 'myinfo-page',
    templateUrl: './myinfo.component.html',
    styleUrls: ['./myinfo.component.scss']
})

export class MyInfoComponent {
   
   	 // Note: Works only using alias from webpack and not by tsconfig ! 
	 imageSrc = require('images/persteenolsen.jpg');
	 imageAlt = 'Per Steen Olsen';

 }