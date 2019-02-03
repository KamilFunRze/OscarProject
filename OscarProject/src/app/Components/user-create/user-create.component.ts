import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { StorageService } from 'src/app/Services/storage.service';
import { HttpRequesterService } from 'src/app/Services/http-requester.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  private user: User = new User(null, "", "", null, null, null);
  private retypePassword : string;


  constructor(private storageService : StorageService,private http: HttpRequesterService, 
    private route: ActivatedRoute, private router: Router) {
      if (window.localStorage.getItem("isLogged") == "true") setInterval(() => {this.router.navigate(["/login"])},1000)
  }

  ngOnInit() {
    
    
  }

  register() {
    if ((this.user.password == this.retypePassword) && 
    (this.user.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)))
    {
      this.user.firstname = this.user.firstname.length == 0 ? null : this.user.firstname
      this.user.lastname = this.user.lastname.length == 0 ? null : this.user.lastname
      this.http.createUser(this.user).subscribe((data: any) => {
        alert("Registered successfully!");
        this.router.navigate(["/login"]);
      },(error : HttpErrorResponse) => {
        alert("Problem with registration " + error.error.userMessage)
      })
    }
    else
    {
      alert("Check password or/and email")
    }
  }

}
