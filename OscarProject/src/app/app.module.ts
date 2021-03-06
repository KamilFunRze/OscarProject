import { DatePipe } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainPageComponent } from './Components/main-page/main-page.component';
import { MovieCreateComponent } from './Components/movie-create/movie-create.component';
import { MovieDetailsComponent } from './Components/movie-details/movie-details.component';
import { MovieEditComponent } from './Components/movie-edit/movie-edit.component';
import { MovieListComponent } from './Components/movie-list/movie-list.component';
import { RateCreateComponent } from './Components/rate-create/rate-create.component';
import { RateListComponent } from './Components/rate-list/rate-list.component';
import { UserCreateComponent } from './Components/user-create/user-create.component';
import { UserDetailsComponent } from './Components/user-details/user-details.component';
import { UserEditComponent } from './Components/user-edit/user-edit.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { HttpRequesterService } from './Services/http-requester.service';
import { StorageService } from './Services/storage.service';
import { MovieRatesComponent } from './Components/movie-rates/movie-rates.component';








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
    RateCreateComponent,
    MainPageComponent,
    MovieEditComponent,
    UserEditComponent,
    MovieRatesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,

  ],
  providers: [
    HttpRequesterService,
    DatePipe,
    StorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
