import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { HttpRequesterService } from 'src/app/Services/http-requester.service';
import { StorageService } from 'src/app/Services/storage.service';
import { logging } from 'protractor';


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
      this.user.id = window.localStorage.getItem('userId')  ? +window.localStorage.getItem('userId') : null;
      if (this.user.id != null) this.getUserData(this.user.id);
  }

  ngOnInit() {
    
  }


  login() {
    this.http.login(this.user.login, this.user.password)
      .subscribe((data: HttpResponse < any > ) => {
          alert("Logged in successfully");
          window.localStorage.setItem("isLogged","true");
          this.isLogged = true;
          window.localStorage.setItem('userId',data.body.userId.toString());
          this.storageService.changeMessage("login");
          this.getUserData(data.body.userId)
        
      },
      (error: HttpErrorResponse ) => {
        
        alert("Problem with login. " + error.error.userMessage + " Try again.");
        window.localStorage.removeItem('userId');
        window.localStorage.setItem("isLogged","false");
      })

  }

  logout() {
    
    window.localStorage.setItem("isLogged","false");
    this.isLogged = false;
    window.localStorage.removeItem('userId');
    this.user.login = "";
    this.user.password = "";
    this.http.logout().subscribe((data: any) => {},
    (error: HttpErrorResponse) => {alert(error.error.userMessage);})
  
    this.storageService.changeMessage("logout");
    
  }

  getUserData(userId : number) {
   return this.http.getOneUser(userId).subscribe((data : any) => {
    this.user = data;
   })
  }

  keyDownFunction(event) {
    if(event.keyCode == 13) {
      this.login();
    }
  }
}
