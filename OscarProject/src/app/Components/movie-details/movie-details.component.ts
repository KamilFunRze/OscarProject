import { Component, OnInit } from '@angular/core';
import { HttpRequesterService } from 'src/app/Services/http-requester.service';
import { Movie } from 'src/app/Models/movie';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {


  private movie : Movie = new Movie(null,null,null,null,null,null);;
  private id : number;
  constructor(private http : HttpRequesterService, 
    private route: ActivatedRoute, 
    private datePipe:DatePipe, router : Router) {
    this.OnChanges();
    router.events.subscribe((val) => {
      
      if (val instanceof NavigationEnd)
      {
        this.OnChanges();
      } 
  });
   }

  ngOnInit() {
    
    
  }

  OnChanges() {
    this.route.params.subscribe(params => {
      this.id =  +params['id'];
    });
    this.http.getOneMovie(this.id).subscribe((movie : Movie) => {
      this.movie = movie;
      this.movie._premiereDate= this.datePipe.transform(movie.premiereDate, 'yyyy-MM-dd');
    })
  }

}
