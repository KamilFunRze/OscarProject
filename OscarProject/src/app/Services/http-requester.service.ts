import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { catchError, map, tap } from 'rxjs/operators';
// import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class HttpRequesterService {


API_URL  =  'http://localhost:5555/api';

constructor(private  httpClient:  HttpClient) {}


getMovies(){
    return  this.httpClient.get(`${this.API_URL}/movies`);
}

    

  
}
