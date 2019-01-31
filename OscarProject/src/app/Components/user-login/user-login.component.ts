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
import { StorageService } from 'src/app/Services/storage.service';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  private user: User = new User(null, "", "", null, null, null);
  private isLogged : boolean;

  constructor(private storageService : StorageService,private http: HttpRequesterService, private route: ActivatedRoute, router: Router) {
      this.isLogged = JSON.parse(window.localStorage.getItem('isLogged') || "false");
      this.user.login = window.localStorage.getItem('userLogin') || ""
      this.user.firstname = window.localStorage.getItem('userFirstName') || ""
      this.user.lastname = window.localStorage.getItem('userLastName') || ""
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
          window.localStorage.setItem('userLogin',this.user.login);
          this.storageService.changeMessage("login");
          this.getUserData(data.body.userId)
        
      },
      (error: HttpErrorResponse ) => {
        
        alert("Problem with login. " + error.error.userMessage);
        console.log(error.error.internalMessage);
        window.localStorage.setItem("isLogged","true");
        this.isLogged = true;
        window.localStorage.removeItem('userLogin');
      })

  }

  logout() {
    
    window.localStorage.setItem("isLogged","false");
    this.isLogged = false;
    window.localStorage.removeItem('userLogin');
    this.user.login = "";
    this.user.password = "";
    this.http.logout().subscribe((data: any) => {},
    (error: HttpErrorResponse) => {alert(error.error.userMessage);})
  
    this.storageService.changeMessage("logout");
    
  }

  getUserData(userId : number) {
   return this.http.getOneUser(userId).subscribe((data : any) => {
    this.user = data;
    console.log(data);
   })
  }
}
