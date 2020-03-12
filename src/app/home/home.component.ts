import { FilterService } from './../_services/filter/filter.service';
import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';
import { User } from '@/_models';
import { AuthenticationService } from '@/_services/Authentication/authentication.service';
import { UserService } from '@/_services';
//import { FilterService } from '@/_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;

  constructor(private userService: UserService,
    private authenticationService: AuthenticationService, private filterService: FilterService)
     {this.currentUser = this.authenticationService.currentUserValue;}

     ngOnInit() {
      // this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
      //     this.userFromApi = user;
      // });
    }
    setCheckbox(name:string){
      console.log("home setCheckbox")
      this.filterService.setCheckbox(name);    
    }

}
