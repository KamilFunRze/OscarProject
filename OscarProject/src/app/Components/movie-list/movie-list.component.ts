import { Component, OnInit } from '@angular/core';
import { HttpRequesterService } from '../../Services/http-requester.service';
import { DatePipe } from '@angular/common';
import { Movie } from 'src/app/Models/movie';








@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {

  private movies : Array<Movie> = [];
  constructor(private  httpService:  HttpRequesterService, private datePipe:DatePipe) { }


  ngOnInit() {
    this.getMovies();
}


 getMovies(){
    this.httpService.getMovies().subscribe((data:  Array<Movie>) => {
      data.forEach(movie => {
        movie._premiereDate= this.datePipe.transform(movie.premiereDate, 'yyyy-MM-dd');
      })
      
      this.movies  =  data;

    });
  }

}
