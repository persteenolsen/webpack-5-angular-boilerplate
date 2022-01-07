import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { MyInfoComponent } from './components/myinfo/myinfo.component';
import { ListpostsComponent } from './components/listposts/listposts.component';
import { SelectedPostComponent } from './components/selectedpost/selectedpost.component';
import { EditPostComponent } from './components/editpost/editpost.component';
import { CreatePostComponent } from './components/createpost/createpost.component';

import { ErrorComponent } from './components/error/error.component';

import '../styles/index.scss';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
		AboutComponent,
		MyInfoComponent,
		ListpostsComponent,
		SelectedPostComponent,
		EditPostComponent,
		CreatePostComponent,
        ErrorComponent		
		
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
		HttpClientModule,
        ReactiveFormsModule		
    ],
    providers: [],
    bootstrap: [
        AppComponent
    ]
})

export class AppModule {}