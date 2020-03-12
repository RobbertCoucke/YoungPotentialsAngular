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

<<<<<<< HEAD
    console.log(this.registerForm.controls.value);

    this.loading = true;  
    //de register model krijgen   
    var regModel = this.getRegisterModel();

    console.log(regModel);


    //de gebruiker toevoegen aan de database
     this.authenticationService.register(regModel).subscribe(
            data => {
                this.router.navigate([""]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });   
}

  //get de register model nadat de gebruiker zijn data ingevuld heb
  getRegisterModel(){
    var controls = this.registerformControls;
    //elke gebruiker moet zin email, password invullen
    var model = new Register(controls.email.value, controls.password.value, this.isStudent);
    model.telephone = controls.telephone.value;
    //model.city = controls.city.value;
    model.zipCode = controls.zipCode.value;
    model.address = controls.address.value;
    model.city = controls.city.value;

    //de student moet zijn naam, voorname en CV geven.
    if(this.isStudent){
      model.name = controls.lastName.value;
      model.firstName = controls.firstName.value;
    }
    //bedrijf moet een beschrijving, url en naam geven
    else{

      model.description = controls.description.value;
      model.url = controls.url.value;
      model.companyName = controls.companyName.value;
    }

    return model;

  }

  //register als student
=======
>>>>>>> 6ab6e42a6f93ceb4245f65491a80866725116d2e
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
