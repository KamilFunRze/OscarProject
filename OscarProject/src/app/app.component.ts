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
  movies :Array<Movie>;
  constructor(private http : HttpRequesterService) {
    
  }

  ngOnInit() {
    this.http.getMovies().subscribe((data : any) => { // getLatestMovies TODO
      this.movies = data;
      // console.log(this.movies);
    })
  }


  
}
