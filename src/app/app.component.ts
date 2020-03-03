import { Component } from '@angular/core';
import { StudieService } from "./Service/studie.service"
import { StudieGebied } from './Model/StudieGebied';

import { AuthenticationService } from './_services/Authentication/authentication.service';
import { User, Role } from './_models';


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

  constructor(private studieService: StudieService, 
    private authenticationService: AuthenticationService)
    {this.authenticationService.currentUser.subscribe(x => this.currentUser = x);};

  ngOnInit() {
    this.getData();
    this.showConfig();
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  getData() : void{
    this.studieService.getData().subscribe(studies => this.data = studies );
  }

  showConfig() {
    this.studieService.getConfigResponse().subscribe(resp => {
      const key = resp.headers.keys();
    })
  }
}
