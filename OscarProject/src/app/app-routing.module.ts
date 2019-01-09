import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { UserListComponent } from './Components/user-list/user-list.component';
import { UserDetailsComponent } from './Components/user-details/user-details.component';
import { UserCreateComponent } from './Components/user-create/user-create.component';
import { RateListComponent } from './Components/rate-list/rate-list.component';
import { RateCreateComponent } from './Components/rate-create/rate-create.component';
import { RateDetailsComponent } from './Components/rate-details/rate-details.component';
import { MovieListComponent } from './Components/movie-list/movie-list.component';
import { MovieCreateComponent } from './Components/movie-create/movie-create.component';
import { MovieDetailsComponent } from './Components/movie-details/movie-details.component';
import { MainPageComponent } from './Components/main-page/main-page.component';

const routes: Routes = [

{
  path:  '',
  component:  MainPageComponent
},
{
  path:  'login',
  component:  UserLoginComponent
},
{
  path:  'users',
  component:  UserListComponent
},
{
  path:  'users/details',
  component:  UserDetailsComponent
},
{
  path:  'users/add',
  component:  UserCreateComponent
},
{
  path:  'rates',
  component:  RateListComponent
},
{
  path:  'rates/add',
  component:  RateCreateComponent
},
{
  path:  'rates/details',
  component:  RateDetailsComponent
},
{
  path:  'movies',
  component:  MovieListComponent
},
{
  path:  'movies/add',
  component:  MovieCreateComponent
},
{
  path:  'movies/details',
  component:  MovieDetailsComponent
},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
