import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../_services/Authentication/authentication.service'
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Register } from '@/_models/register';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
    }
     }

  ngOnInit() {
    this.registerForm = this.formBuilder.group(Register);
  }

  get f() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }

    this.loading = true;
    var regModel = this.getRegisterModel();

    this.authenticationService.register(regModel)
        .pipe(first())
        .subscribe(
            data => {
                this.router.navigate([this.returnUrl]);
            },
            error => {
                this.error = error;
                this.loading = false;
            });
}

  getRegisterModel(){
    var controls = this.f;
    var model = new Register(controls.email.value, controls.password.value, controls.isStudent.value);
    model.telephone = controls.telephone.value;
    model.city = controls.city.value;
    model.zipCode = controls.zipCode.value;
    model.address = controls.address.value;

    if(controls.isStudent){
      model.name = controls.name.value;
      model.firstName = controls.name.value;
      model.cvUrl = controls.cvUrl.value;
    }else{
      model.description = controls.description.value;
      model.url = controls.url.value;
      model.companyName = controls.companyName.value;
    }

    return model;

  }

}
