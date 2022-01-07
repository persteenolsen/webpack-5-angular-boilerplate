import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { MyInfoComponent } from './components/myinfo/myinfo.component';
import { ListpostsComponent } from './components/listposts/listposts.component';
import { SelectedPostComponent } from './components/selectedpost/selectedpost.component';
import { EditPostComponent } from './components/editpost/editpost.component';
import { CreatePostComponent } from './components/createpost/createpost.component';

import { ErrorComponent } from './components/error/error.component';

const appRoutes: Routes = [

    { path: '', component: HomeComponent },
	{ path: 'about', component: AboutComponent },
	{ path: 'myinfo', component: MyInfoComponent },
	{ path: 'listposts', component: ListpostsComponent },
	{ path: 'thepost/:id', component: SelectedPostComponent },
	{ path: 'editpost/:id', component: EditPostComponent },
	{ path: 'createpost', component: CreatePostComponent },
	
	{ path: 'error', component: ErrorComponent },
		
    // otherwise redirect to home
    { path: '**', redirectTo: 'error' }
		
	
];

// Note: To avoid status code 404 on refresh menu page the following - none seo friendly - code have been used below:  { useHash: true }
// { useHash: true } is only for developement - in production using rules in .htaccess !
//RouterModule.forRoot(appRoutes, { useHash: true })

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}