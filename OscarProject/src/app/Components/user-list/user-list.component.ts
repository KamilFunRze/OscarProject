import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/user';
import { HttpRequesterService } from 'src/app/Services/http-requester.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {


  private users : Array<User> = [];

  constructor(private  httpService:  HttpRequesterService) { }

  ngOnInit() {
    this.getUsers();
  }


  getUsers(){
    this.httpService.getUsers().subscribe((data:  Array<User>) => {
      this.users  =  data;
      console.log(data);
    });
  }

}
