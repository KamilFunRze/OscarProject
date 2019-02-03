import { Component, OnInit, Input } from '@angular/core';
import { Rate } from 'src/app/Models/rate';
import { HttpRequesterService } from 'src/app/Services/http-requester.service';
import { StorageService } from 'src/app/Services/storage.service';
import { HttpResponse } from '@angular/common/http';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-rates',
  templateUrl: './movie-rates.component.html',
  styleUrls: ['./movie-rates.component.css']
})
export class MovieRatesComponent implements OnInit {

  @Input() movieId : number;
  private rates : Array<Rate>;

  constructor(private http : HttpRequesterService, 
     private storageService : StorageService,
     private router : Router,
     private route : ActivatedRoute) {
      setTimeout(()=>{this.updateRates()},1);
       storageService.currentMessage.subscribe((data : string) => {
         if (data == "addedRate") 
         {
           this.updateRates();
         }
       });
       router.events.subscribe((val) => {
      
        if (val instanceof NavigationEnd)
        {
          this.OnChanges();
        } 
    });
      }

  ngOnInit() {
    
  }

  updateRates() {
    this.http.getMyRatesForMovie(this.movieId).subscribe((data : HttpResponse<any>) => {
      this.rates = data.body;
    })
  }

  OnChanges() {
    this.route.params.subscribe(params => {
      this.movieId =  +params['id'];
    });
    this.updateRates();
  }

}
