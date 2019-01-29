import { Component } from '@angular/core';
import { HttpRequesterService } from './Services/http-requester.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {


  title = 'OscarProject';

  constructor(private http : HttpRequesterService) {
    
  }

  ngOnInit() {
    this.http.getMovies()
  }


  
}
