import { Component } from '@angular/core';

import { AuthenticationService } from './_services/Authentication/authentication.service';
import { User, Role } from './_models';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projectYoungPotentials';
  currentUser: User;

  data : any = [];

  s : any = [];

  constructor(
    private authenticationService: AuthenticationService, private router: Router)
    {this.authenticationService.currentUser.subscribe(x => this.currentUser = x);};

  ngOnInit() {
    this.getData();
    this.showConfig();
    this.route();
  }
  route()
  {
    this.router.events.subscribe((evt) => {
      if(!(evt instanceof NavigationEnd)){
        return;
      }
      window.scrollTo(0,0)
    })
  }
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  getData() : void{
  }

  showConfig() {

  }
}
