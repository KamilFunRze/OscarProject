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
  private editRate : number;

  constructor(private http : HttpRequesterService, 
     private storageService : StorageService,
     private router : Router,
     private route : ActivatedRoute) {
      // setTimeout(()=>{this.updateRates()},1);
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

  openRateEditor(rateId,rateScore) {
    this.editRate = this.editRate == rateId ? 0 :rateId;
    setTimeout(()=>this.moveProgressBar(rateScore,rateId),50);
  }

  

  updateRates() {
    this.http.getMyRatesForMovie(this.movieId).subscribe((data : HttpResponse<any>) => {
      this.rates = data.body;
      this.rates.forEach(rate => {
        this.moveProgressBar(rate.score,rate.id);
      })
    })
  }

  OnChanges() {
    this.route.params.subscribe(params => {
      this.movieId =  +params['id'];
    });
    this.updateRates();
  }

  getClickPosition(e,rateId : number) {
    let xPosition = e.clientX;
    var rect = document.getElementById("progressBarOuter"+rateId).getBoundingClientRect();
    let rate :Rate;
   this.rates.forEach((ra) => {
    if(ra.id == rateId)
      rate = ra;
  });
    rate.score = (xPosition - rect.left)/(rect.right - rect.left)*100;
    rate.score = +rate.score.toFixed();
    this.moveProgressBar(rate.score,rate.id);
    
}

moveProgressBar(score : number,rateId:number) {
  let bar = document.getElementById("progressBar"+rateId);
    if (bar != null)
    {
    bar.style.width = (score).toString() + "%";
    bar.style.backgroundColor =  
    `rgb(${(100 - score)*255/100}, ${score*255/100}, 0)`;
    }
}

setWantToSee(option : boolean, rateId: number) {
  let rate :Rate;
   this.rates.forEach((ra) => {
    if(ra.id == rateId)
      rate = ra;
  });
  rate.wantToSee = option;
}

submitRate(rateId: number) {
  let rate :Rate;
   this.rates.forEach((ra) => {
    if(ra.id == rateId)
      rate = ra;
  });
  
  rate.rateComment = rate.rateComment == null || rate.rateComment.length == 0 ?
   null : rate.rateComment;
  this.http.updateRate(rate.id,rate).subscribe((data : any) => {
    alert("Successfully changed this rate.");
    this.storageService.changeMessage("addedRate");
  })
}

}
