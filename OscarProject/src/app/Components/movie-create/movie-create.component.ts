import { Component, OnInit } from '@angular/core';
import { HttpRequesterService } from 'src/app/Services/http-requester.service';
import { Movie } from 'src/app/Models/movie';

@Component({
  selector: 'app-movie-create',
  templateUrl: './movie-create.component.html',
  styleUrls: ['./movie-create.component.css']
})
export class MovieCreateComponent implements OnInit {

  private movie : Movie;
  constructor(private http: HttpRequesterService) { 
    this.movie = new Movie(null,null,null,null,null,null);
    
  }

  ngOnInit() {
    // this.addMovie();
  }


  addMovie() {
    this.http.createMovie(this.movie).subscribe((data : Movie) => {
      console.log(data);
    })
  }

}
