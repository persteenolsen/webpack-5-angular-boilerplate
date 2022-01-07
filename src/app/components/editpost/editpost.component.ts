//import 'whatwg-fetch';

import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from "@angular/router";


import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'editpost-page',
    templateUrl: './editpost.component.html',
    styleUrls: ['./editpost.component.scss']
})

export class EditPostComponent implements OnInit {
    
	registerForm: FormGroup;
    submitted: any;
	
   	postId: any;
	idParam: any;
	errorMessage: any;	
	
    // Constructor	
    constructor( private http: HttpClient, private readonly route: ActivatedRoute, private formBuilder: FormBuilder ) { }
    
	// Convenience getter for easy access to form fields in the template and here
    get f() { return this.registerForm.controls; }

    onSubmit() {
            
			this.submitted = true;

            // stop here if form is invalid
            if (this.registerForm.invalid) {
            return;
            }

           // alert( 'Form values you entered:\n\n' + JSON.stringify( this.registerForm.value ));
		   alert( 'Form values you submitted:\n\nId:\n' + 
		           this.registerForm.get('idpost').value + '\n\nTitle:\n' + 
		           this.registerForm.get('title').value + '\n\nBody:\n' + 
		           this.registerForm.get('body').value  
		        );
		 			
		    const body = { title: this.registerForm.get('title').value, body: this.registerForm.get('body').value };
            this.http.put<EditResult>('https://jsonplaceholder.typicode.com/posts/' + this.registerForm.get('idpost').value, body )
           .subscribe({
           
		   next: data => {
		        
				// Not really needed :-)
                this.postId = data.id;
				
				alert( 'Form values returned from the Web API:\n\nId:\n' + data.id + '\n\nTitle:\n' + data.title + '\n\nBody:\n' + data.body );
				
				 // Setting the GUI with the value returned from the Web API
		        this.f.idpost.setValue( data.id );
		        this.f.title.setValue( 'Title from Web API: ' + data.title );
                this.f.body.setValue( 'Body from Web API: ' + data.body ); 
				
				
            },
            error: error => {
                this.errorMessage = error.message;
                console.error('There was an error!', error);
            }
          });		
		
     }
	 
	   
    ngOnInit() {  
	
	      // Building the Form
	      this.registerForm = this.formBuilder.group({
		   
		   idpost: ['', Validators.required],
           title: ['', Validators.required],
           body: ['', Validators.required]
			
        }); 
		
		 	    
		 // Getting the selected post ( for exampe: posts/3 ) from the url matching the route defined in the route-module: editpost:id 
         this.idParam = this.route.snapshot.paramMap.get("id");
		 			    
		// Get Request for a selected post by id from the jsonplaceholder
		// Note: With Error handling: If there is an error like wrong url - an error message will be displayed
	    this.http.get<SearchResult>('https://jsonplaceholder.typicode.com/posts/' + this.idParam ).subscribe({
		   
		    next: data => {
			
                // Not really needed :-)
				this.postId = data.id;
								
				// Setting the form input initial values received from the Web API 
				this.f.idpost.setValue( data.id );
				this.f.title.setValue( data.title );
                this.f.body.setValue( data.body );
							
            },
            error: error => {
                this.errorMessage = error.message;
                console.error('There was an error!', error);
            }
       })
	 
    }
}


// The interface matching the result from jsonplaceholder Web API
interface SearchResult {
   
    userId: any;
	id: any;
    title: any;
	body: any;
	}


// The interface matching the result from jsonplaceholder Web API
interface EditResult {
    
	userID: any;
   	id: any;
    title: any;
	body: any;
}