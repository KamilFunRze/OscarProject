import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { HttpRequesterService } from 'src/app/Services/http-requester.service';
import { StorageService } from 'src/app/Services/storage.service';
import { User } from 'src/app/Models/user';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  private user: User = new User(null, "", "", null, null, null);
  private retypePassword: string;


  constructor(private storageService: StorageService, private http: HttpRequesterService,
    private route: ActivatedRoute, private router: Router) {
      this.OnChanges();
      router.events.subscribe((val) => {
        if (val instanceof NavigationEnd) {
          this.OnChanges();
        }
      });
      if (!window.localStorage.getItem("isLogged")) {
        router.navigate(["/login"])
      }
      else if (+window.localStorage.getItem("userId") != this.user.id) 
      {
        router.navigate(["/users/details/" + this.user.id])
      }

    
  }

  ngOnInit() {


  }

  OnChanges() {
    this.route.params.subscribe(params => {
      this.user.id = +params['id'];
    });
    this.http.getOneUser(this.user.id).subscribe((user: User) => {
      this.user = user;
      this.user.password = "";
    })
  }

  editUser() {
    if ((this.user.password == this.retypePassword) &&
      (this.user.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))) {
      this.http.updateUser(this.user.id, this.user).subscribe((data: any) => {
        alert("Edited successfully");
      },(error : HttpErrorResponse) => {
        alert("Problem occured. " + error.error.userMessage)
      })
    } else {
      alert("Check password or/and email");
    }
  }

}
