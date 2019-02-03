import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/Models/movie';
import { RateExtended } from 'src/app/Models/rateExtended';
import { HttpRequesterService } from 'src/app/Services/http-requester.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rate-list',
  templateUrl: './rate-list.component.html',
  styleUrls: ['./rate-list.component.css']
})
export class RateListComponent implements OnInit {


  
  private ratesExtended : Array<RateExtended> = [];
  private isSelfRatesList : boolean;
  private username : string;
  constructor(private http : HttpRequesterService, 
    private router : Router,
    private route : ActivatedRoute) {
    route.params.subscribe(params => {
      if (params['userId'] == undefined) 
      {
        this.getMyRates();
        this.isSelfRatesList = true;
      }
      else 
      {
        this.getUserRates(params['userId']);
        this.isSelfRatesList = false;
        this.http.getOneUser(params['userId'])
        .subscribe((data : any) => {
          this.username = data.login
        })
      }
    })


    


   }

  ngOnInit() {
    
  }

  getMyRates() {
    this.http.getMyRates()
    .subscribe((data: HttpResponse<Array<RateExtended>>) => {
      this.ratesExtended = data.body;
      this.ratesExtended.forEach((rateExtended : RateExtended) => {
        this.http.getOneMovie(rateExtended.movie_id).subscribe((movie : Movie) => {
          rateExtended.movie = movie;
        })
      })
    });
  }

  getUserRates(userId : number) {
    this.http.getAllRatesForUser(userId)
    .subscribe((data: HttpResponse<Array<RateExtended>>) => {
      this.ratesExtended = data.body;
      this.ratesExtended.forEach((rateExtended : RateExtended) => {
        this.http.getOneMovie(rateExtended.movie_id).subscribe((movie : Movie) => {
          rateExtended.movie = movie;
        })
      })
    });
  }

}
