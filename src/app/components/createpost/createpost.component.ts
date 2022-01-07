//import 'whatwg-fetch';

import { Component, OnInit } from "@angular/core";
import { HttpClient } from '@angular/common/http';

import { ActivatedRoute, Router } from "@angular/router";


import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
    selector: 'createpost-page',
    templateUrl: './createpost.component.html',
    styleUrls: ['./createpost.component.scss']
})

export class CreatePostComponent implements OnInit {
    
	registerForm: FormGroup;
    submitted: any;
	
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
		   alert( 'Form values you submitted:\n\nTitle:\n' + 
		           this.registerForm.get('title').value + '\n\nBody:\n' + 
		           this.registerForm.get('body').value  
		        );
		 			
		    const body = { userId: 1, title: this.registerForm.get('title').value, body: this.registerForm.get('body').value };
            this.http.post<CreateResult>('https://jsonplaceholder.typicode.com/posts/', body )
           .subscribe({
           
		    next: data => {
		        								
				alert( 'Form values returned from the Web API:\n\nId:\n' + 
				       data.id + '\n\nTitle:\n' + data.title + '\n\nBody:\n' + data.body + '\n\nuserId:\n' + data.userId );
				
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
		   
		   idpost: [''],
           title: ['', Validators.required],
           body: ['', Validators.required]
			
        }); 
		
		  
		 
    }
}


// The interface matching the result from jsonplaceholder Web API
interface CreateResult {
    
	userId: any;
   	id: any;
    title: any;
	body: any;
}