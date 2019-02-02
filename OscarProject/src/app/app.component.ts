import { Component } from '@angular/core';
import { HttpRequesterService } from './Services/http-requester.service';
import { Movie } from './Models/movie';
import { StorageService } from './Services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'OscarProject';
  movies : Array<Movie> = [];
  private isLogged : boolean;
  private userId : number;
  constructor(private storageService : StorageService, private http : HttpRequesterService) {
    this.isLogged = JSON.parse(window.localStorage.getItem('isLogged') || "false");
    if (this.isLogged) this.userId = +window.localStorage.getItem('userId') 
    storageService.currentMessage.subscribe((data : any) => {
      this.isLogged = JSON.parse(window.localStorage.getItem('isLogged') || "false");
      if (this.isLogged) this.userId = +window.localStorage.getItem('userId')
    })
  }

  ngOnInit() {
    this.updateLatestMovies();
    setInterval(() => {
      this.updateLatestMovies();
    },30000)
  }

  updateLatestMovies() {
    
    this.http.getLatestMovies().subscribe((data : Array<Movie>) => { 
      this.movies = [];
      for (let i = 0;data[i] && i<5;i++)
      this.movies.push(data[i])
    })
  }


  
}
