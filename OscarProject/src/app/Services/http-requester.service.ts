import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Movie } from '../Models/movie';
// import { catchError, map, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HttpRequesterService {


API_URL  =  'http://192.168.1.119:5555/api';

constructor(private  httpClient:  HttpClient) {}



getLatestMovies(){
    return  this.httpClient.get(`${this.API_URL}/movies/latest`);
}

getMovies(){
  return  this.httpClient.get(`${this.API_URL}/movies`);
}

createMovie(model: any): Observable <any> {
  return this.httpClient.post(`${this.API_URL}/movies`, model); 
}

getOneMovie(movieId:number) {
  return  this.httpClient.get(`${this.API_URL}/movies/${movieId}`);
}

updateMovie(movieId:number, movie:Movie) {

}






login(username:string, password:string) {

}

logout() {

}






getUsers() {

}


getOneUser(userId:number) {

}

createUser() {
  //TODO model usera
}


updateUser(userId:number) {
  //TODO model usera
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

createRate() {
  //TODO model ratea
}

updateRate(rateId:number) {
  //TODO model ratea
}

deleteRate(rateId:number) {
  
}
    

  
}
