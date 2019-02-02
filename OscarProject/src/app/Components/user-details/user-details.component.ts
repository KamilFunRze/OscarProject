import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { User } from 'src/app/Models/user';
import { HttpRequesterService } from 'src/app/Services/http-requester.service';
import { StorageService } from 'src/app/Services/storage.service';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {

  private user: User = new User(null, "", "", null, null, null);
  private retypePassword: string;


  constructor(private storageService: StorageService, private http: HttpRequesterService,
    private route: ActivatedRoute, private router: Router) {

    router.events.subscribe((val) => {

      if (val instanceof NavigationEnd) {
        this.OnChanges();
      }

    });
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


}
