import { Component, OnInit } from '@angular/core';
import { User } from '@/_models';
import { AuthenticationService, UserService } from '@/_services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {

   currentUser : User;
    user: User;
  constructor(private userservice: UserService, private authenticatieService: AuthenticationService, private router: Router) {
   /*  if (this.authenticatieService.currentUserValue == null) { 
      this.router.navigate(['/']);
    }else{
      this.authenticatieService.currentUser.subscribe(x => this.currentUser = x);
      this.userservice.getById(this.currentUser.id).subscribe(x => this.user = x);
    } */
   }

  ngOnInit() {
    //console.log(this.user)
  }

}
