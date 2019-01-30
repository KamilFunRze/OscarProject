import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from '../Models/movie';
// import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { User } from '../Models/user';
import { Rate } from '../Models/rate';

@Injectable({
  providedIn: 'root'
})
export class HttpRequesterService {


API_URL  =  'http://192.168.1.119:5555/api';

constructor(private  httpClient:  HttpClient) {


}



getLatestMovies(): Observable <any> {
    return  this.httpClient.get(`${this.API_URL}/movies/latest`);
}

getMovies(): Observable <any> {
  return  this.httpClient.get(`${this.API_URL}/movies`);
}

createMovie(movie: Movie): Observable <any> {
  return this.httpClient.post(`${this.API_URL}/movies`, movie); 
}

getOneMovie(movieId:number): Observable <any> {
  return  this.httpClient.get(`${this.API_URL}/movies/${movieId}`);
}

updateMovie(movieId:number, movie:Movie): Observable <any> {
  return this.httpClient.put(`${this.API_URL}/movies/${movieId}`, movie); 
}






login(username:string, password:string): Observable<any> {
return this.httpClient.post(`${this.API_URL}/login/login`,new User(null,username,password,null,null,null),{observe : "response",withCredentials:true});
}

logout(): Observable <any> {
 return this.httpClient.get(`${this.API_URL}/login/logout`,{observe : "response",withCredentials:true});
}






getUsers() {

}


getOneUser(userId:number) {

}

createUser(user : User) {

}


updateUser(userId:number, user : User) {

}





getMyRates() {

}

getMyRatesForMovie(movieId:number) {
  
}

getOneRate(rateId:number) {
  
}

getAllRatesForMovie(movieId:number) {
  
}

getAllRatesForUser(userId:number) {
  
}

createRate(rate : Rate) {
  //TODO model ratea
  return this.httpClient.post(`${this.API_URL}/rates`,
  rate , {observe : "response",withCredentials:true})
}

updateRate(rateId:number) {
  //TODO model ratea
}

deleteRate(rateId:number) {
  
}
    

  
}
