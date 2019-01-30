import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Models/movie';
import { HttpRequesterService } from 'src/app/Services/http-requester.service';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { DatePipe } from '@angular/common';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
  selector: 'app-movie-edit',
  templateUrl: './movie-edit.component.html',
  styleUrls: ['./movie-edit.component.css']
})
export class MovieEditComponent implements OnInit {

  
  private movie : Movie;
  private id : number;
  constructor(private http : HttpRequesterService, private route: ActivatedRoute, private datePipe:DatePipe,router : Router) {
    this.movie = new Movie(null,null,null,null,null,null);
    router.events.subscribe((val) => {
      
      if (val instanceof NavigationEnd)
      {
        this.OnChanges();
      }
       
  });
   }

  ngOnInit() {
    
    this.OnChanges();
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

  editMovie() {
    this.movie.premiereDate = new Date(this.movie._premiereDate);
    this.http.updateMovie(this.id,this.movie).subscribe((data : Movie) => {
      alert("Successfully updated Movie: " + data.title);
      this.OnChanges();
    })
  }

}
