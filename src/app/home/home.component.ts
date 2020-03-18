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
    private authenticationService: AuthenticationService, private filterService: FilterService) { this.currentUser = this.authenticationService.currentUserValue; }

  ngOnInit() {
    // TODO: Eventueel code opkuis
    // this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
    //     this.userFromApi = user;
    // });
  }

  //Klikt de checkbox aan die overeenkomt met de selectie die wordt meegegeven
  setCheckbox(name: string) {
    this.filterService.setCheckbox(name);
  }
  //Functie om een cookie op te vragen.
  getCookie(name: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");

    if (parts.length == 2) {
      return parts.pop().split(";").shift();
    }
  }
}