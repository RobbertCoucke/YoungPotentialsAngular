import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../_services/Authentication/authentication.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Register } from '@/_models/register';
import { MustMatch } from 'app/_helpers/mustMatch';
import { SectorService } from '@/_services/Sector/sector.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  
  error: string;
  loading: boolean;
  isStudent : boolean;

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
    }

     }

  ngOnInit() { }

  studentClicked(){
    this.isStudent = true;
    console.log(this.isStudent);
    
  }
  //register als bedrijf
  bedrijfClicked() {
    this.isStudent = false;
    console.log(this.isStudent);
  }

  //hidden maken van input velden vooraleer op buttons werd geklikt

  IsHidden= true;

  onSelect(){
  this.IsHidden= false;
}

register(model){
  console.log(model);
      //de gebruiker toevoegen aan de database
      this.authenticationService.register(model).subscribe(
        data => {
            this.router.navigate(["/"]);
        },
        error => {
            this.error = error;
            this.loading = false;
        });
}
}
