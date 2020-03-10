import { Component, OnInit } from '@angular/core';
import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';
import { Router } from '@angular/router';
import { getTreeNoValidDataSourceError } from '@angular/cdk/tree';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  submitted = false;
  error = '';
  currentUser : User;
  isStudent : boolean;
  profiel: any;

  constructor(private userservice: UserService, private authenticatieService: AuthenticationService,
    private router: Router){
  }

  ngOnInit() {
    if (this.authenticatieService.currentUserValue == null) { 
      alert("Nice try, hackerman. :)");
      this.router.navigate(['/']);
    }else{
      this.authenticatieService.currentUser.subscribe(x => {
        this.currentUser=x;
        this.userservice.getById(this.currentUser.id).subscribe(data => {
          this.isStudent=data.isStudent;
          this.profiel = data;
          console.log(this.profiel);
          });
      });
    } 
  }
}
