//import 'whatwg-fetch';

import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'listposts-page',
    templateUrl: './listposts.component.html',
    styleUrls: ['./listposts.component.scss']
})

export class ListpostsComponent implements OnInit {

    totalAngularPackages: any;
	listOfPosts: any;
	errorMessage: any;
	
    // The Constructor	
    constructor(private http: HttpClient) { }
	
	// A function to delete the selected Post fired by click at the listpost.component.html - Template
	deletePost(id: number) {
	  
	     if( confirm( "Are you sure to delete the Post width Id: " + id ) ) {
	  
	       // this.http.delete('https://jsonplaceholder.typicode.com/invalid-url/' + id )
		   this.http.delete('https://jsonplaceholder.typicode.com/posts/' + id )
           .subscribe({
		   
               next: data => {
			
                    alert('The Post was deleted successfully!');
			
			       // Removing the selected row from the table
			       this.listOfPosts.splice( (id-1), 1 );
							
                 },
            error: error => {
                this.errorMessage = error.message;
                console.error('There was an error!', error);
            }
        });
	  
	  }
       
    }

	
    ngOnInit() {  
	    
			    
		// Get Request for the total number of Angular packages at api.nmps.io
        this.http.get<NPMSearchResult>('https://api.npms.io/v2/search?q=scope:angular').subscribe(data => {
        this.totalAngularPackages = data.total;
        })
	  		
	    
		// Get Request for a list of posts at jsonplaceholder
		// Note: With Error handling: If there is an error like wrong url - an error message will be displayed
	    this.http.get<PostSearchResult>('https://jsonplaceholder.typicode.com/posts?_start=0&_limit=10').subscribe({
		   
		    next: data => {
                this.listOfPosts = data;
            },
            error: error => {
                this.errorMessage = error.message;
                console.error('There was an error!', error);
            }
       })
	   
    }
}


// The interface matching the result from api.nmps.io Web API
interface NPMSearchResult {
    total: number;
    results: Array<object>;
}

// The interface matching the result from jsonplaceholder Web API
interface PostSearchResult {
    userId: any;
	id: any;
    title: any;
	body: any;
 
}