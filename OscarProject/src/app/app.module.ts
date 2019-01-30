import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';


import { AppComponent } from './app.component';
import { HttpRequesterService } from './Services/http-requester.service';

import { UserListComponent } from './Components/user-list/user-list.component';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { UserCreateComponent } from './Components/user-create/user-create.component';
import { UserDetailsComponent } from './Components/user-details/user-details.component';
import { MovieCreateComponent } from './Components/movie-create/movie-create.component';
import { MovieListComponent } from './Components/movie-list/movie-list.component';
import { MovieDetailsComponent } from './Components/movie-details/movie-details.component';
import { RateListComponent } from './Components/rate-list/rate-list.component';
import { RateDetailsComponent } from './Components/rate-details/rate-details.component';
import { RateCreateComponent } from './Components/rate-create/rate-create.component';
import { MainPageComponent } from './Components/main-page/main-page.component';



import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MovieEditComponent } from './Components/movie-edit/movie-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    UserListComponent,
    UserLoginComponent,
    UserCreateComponent,
    UserDetailsComponent,
    MovieCreateComponent,
    MovieListComponent,
    MovieDetailsComponent,
    RateListComponent,
    RateDetailsComponent,
    RateCreateComponent,
    MainPageComponent,
    MovieEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    HttpRequesterService,
    DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
