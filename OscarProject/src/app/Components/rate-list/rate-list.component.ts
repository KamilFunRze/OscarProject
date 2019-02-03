import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Models/movie';
import { RateExtended } from 'src/app/Models/rateExtended';
import { HttpRequesterService } from 'src/app/Services/http-requester.service';

@Component({
  selector: 'app-rate-list',
  templateUrl: './rate-list.component.html',
  styleUrls: ['./rate-list.component.css']
})
export class RateListComponent implements OnInit {


  
  private ratesExtended : Array<RateExtended> = [];
  constructor(private http : HttpRequesterService) {
    this.http.getMyRates().subscribe((data: HttpResponse<Array<RateExtended>>) => {
      this.ratesExtended = data.body;
      this.ratesExtended.forEach((rateExtended : RateExtended) => {
        this.http.getOneMovie(rateExtended.movie_id).subscribe((movie : Movie) => {
          rateExtended.movie = movie;
        })
      })
    });
   }

  ngOnInit() {
    
  }

}
