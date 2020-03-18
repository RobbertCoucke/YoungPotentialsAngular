import { CookieComponent } from './../cookie/cookie.component';
import { FilterService } from './../_services/filter/filter.service';
import { Component, OnInit } from '@angular/core';

import { first } from 'rxjs/operators';
import { User } from '@/_models';
import { AuthenticationService } from '@/_services/Authentication/authentication.service';
import { UserService } from '@/_services';
import { getCookie } from '../cookie/cookie.component';
//import { FilterService } from '@/_services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  currentUser: User;


  constructor(private userService: UserService,
    private authenticationService: AuthenticationService, private filterService: FilterService) {
    this.currentUser = this.authenticationService.currentUserValue;
  }

  ngOnInit() {
    // TODO: Eventueel code opkuis
    // this.userService.getById(this.currentUser.id).pipe(first()).subscribe(user => {
    //     this.userFromApi = user;
    // });
  }

  /**
   * @description Controleer indien cookie language taal verschillend is van Engels.
   * @return  true: De taal is verschillend van Engels
   *          false: De taal is wel Engels
   */
  checkIfLanguageIsEnglish() {
    return getCookie("language") != "en";
  }

  /**
   * @description Klikt de checkbox aan die overeenkomt met de selectie die wordt meegegeven
   */
  setCheckbox(name: string) {
    this.filterService.setCheckbox(name);
  }
}