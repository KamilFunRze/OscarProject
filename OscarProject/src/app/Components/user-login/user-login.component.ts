import {
  Component,
  OnInit
} from '@angular/core';
import {
  User
} from 'src/app/Models/user';
import {
  HttpRequesterService
} from 'src/app/Services/http-requester.service';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  DatePipe
} from '@angular/common';
import {
  HttpHeaders,
  HttpResponse,
  HttpResponseBase,
  HttpErrorResponse
} from '@angular/common/http';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  private user: User = new User(null, "", "", null, null, null);
  private isLogged : boolean;

  constructor(private http: HttpRequesterService, private route: ActivatedRoute,
    private datePipe: DatePipe, router: Router) {
      this.isLogged = JSON.parse(window.localStorage.getItem('isLogged') || "false")
      console.log(this.isLogged)
  }

  ngOnInit() {
    
  }


  login() {
    console.log(this.user);
    this.http.login(this.user.login, this.user.password)
      .subscribe((data: HttpResponse < any > ) => {
          alert("Logged in successfully");
          window.localStorage.setItem("isLogged","true");
          this.isLogged = true;
        
      },
      (error: HttpErrorResponse ) => {
        
        alert("Problem with login. " + error.error.userMessage);
        window.localStorage.setItem("isLogged","true");
        this.isLogged = true;
      })

  }

  logout() {
    
    window.localStorage.setItem("isLogged","false");
    this.isLogged = false;
    
    this.user.login = "";
    this.user.password = "";
    this.http.logout().subscribe((data: any) => {},
    (error: HttpErrorResponse) => {alert(error.error.userMessage);})
  }
}
