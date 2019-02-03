import { Component, OnInit, Input } from '@angular/core';
import { Rate } from 'src/app/Models/rate';
import { HttpRequesterService } from 'src/app/Services/http-requester.service';
import { StorageService } from 'src/app/Services/storage.service';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-rate-create',
  templateUrl: './rate-create.component.html',
  styleUrls: ['./rate-create.component.css']
})
export class RateCreateComponent implements OnInit {

  @Input() movieId : number;
  private progress : number = 50;
  private rate : Rate = new Rate(null,50,null,false,this.movieId,null,null,null);
  private isLogged : boolean= JSON.parse(window.localStorage.getItem("isLogged") || "false");

  constructor(private http : HttpRequesterService, 
    private storageService : StorageService,
    private router : Router,
    private route : ActivatedRoute) {
      
      router.events.subscribe((val) => {
      
        if (val instanceof NavigationEnd)
        {
          this.OnChanges();
        } 
    });
    storageService.currentMessage.subscribe((data : string) => {
      if (data == "login" || data == "logout")
      {
        this.OnChanges();
      }
    })
     }

  ngOnInit() {
    this.moveProgressBar();
  }

  OnChanges() {
    this.route.params.subscribe(params => {
      this.movieId =  +params['id'];
    });

  }

  getClickPosition(e) {
    let xPosition = e.clientX;
    var rect = document.getElementById("progressBarOuter").getBoundingClientRect();
    this.progress = (xPosition - rect.left)/(rect.right - rect.left)*100;
    this.progress = +this.progress.toFixed();
    this.rate.score = this.progress;
    this.moveProgressBar();
    
}

moveProgressBar() {
  let bar = document.getElementById("progressBar");
    bar.style.width = (this.progress).toString() + "%";
    bar.style.backgroundColor =  
    `rgb(${(100 - this.progress)*255/100}, ${this.progress*255/100}, 0)`;
}

setWantToSee(option : boolean) {
  this.rate.wantToSee = option;
}

submitRate() {
  this.rate.movieId = this.movieId;
  this.rate.rateComment = this.rate.rateComment.length == 0 ? null : this.rate.rateComment;
  this.http.createRate(this.rate).subscribe((data : any) => {
    this.rate.wantToSee = false;
    this.progress = 50;
    this.rate.score = this.progress;
    this.rate.rateComment = "";
    this.moveProgressBar();
    alert("Successfully rated this movie.");
    this.storageService.changeMessage("addedRate");
  })
}

}
