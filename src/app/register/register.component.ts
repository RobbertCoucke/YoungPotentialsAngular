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
    //router gebruiken om naar andere component te navigeren
    private router: Router,
    private authenticationService: AuthenticationService,) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
    }

     }

  ngOnInit() { }

  //de gebruiker wilt als student registreren
  studentClicked(){
    //het is student, daardoor wordt studentForm geladen
    this.isStudent = true;
    
  }
  //de gebruiker wilt als bedrijf registreren
  bedrijfClicked() {
    //het is geen student, daardoor wordt companyForm geladen
    this.isStudent = false;
  }

  //hidden maken van input velden vooraleer op buttons werd geklikt

  IsHidden= true;

  onSelect(){
  this.IsHidden= false;
}

//het gekregen model van de child componenten Studentform of companyForm wordt naar de backend server gestuurd
//daarna wordt daar gecontroleerd of de email bestaal wel of nee, als wel wordt de gebruiker met zijn/haar gegevens in de database toegevoed
//anders tonen wij de error.
register(model){
  console.log(model);
  this.loading = true;
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
