import { Component } from '@angular/core';
import { HttpRequesterService } from './Services/http-requester.service';
import { Movie } from './Models/movie';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'OscarProject';
  movies : Array<Movie> = [];
  constructor(private http : HttpRequesterService) {
    
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
