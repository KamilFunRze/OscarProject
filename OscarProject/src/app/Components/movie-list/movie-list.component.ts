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
  private sampleMovie : Movie = new Movie(999,"Film o pszczołach", "Fajny przyroniczy", new Date(2010,2,12),"12-02-2010",500);
  constructor(private  httpService:  HttpRequesterService, private datePipe:DatePipe) { }


  ngOnInit() {
    this.getMovies();
    // console.log(this.movies);
}
public  getMovies(){
    this.httpService.getMovies().subscribe((data:  Array<Movie>) => {
      data.forEach(movie => {
        console.log(movie.premiereDate);
        movie._premiereDate= this.datePipe.transform(movie.premiereDate, 'yyyy-MM-dd');
      })
      
      this.movies  =  data;
        
        // console.log(data);
    });
  }

}
