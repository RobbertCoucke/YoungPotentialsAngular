import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../_services/Authentication/authentication.service'
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { Register } from '@/_models/register';
import { MustMatch } from 'app/_helpers/mustMatch';

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
  title : String = "Maak a student account"
  isStudent : boolean = true;

  private emailValidators = [
    Validators.maxLength(250),
    Validators.required,
    Validators.minLength(5),
    Validators.pattern(/.+@.+\..+/)
];

private passwordValidators = [
  Validators.minLength(6),
  Validators.required
];

private nameValidators = [
  Validators.maxLength(50),

];

private commonvalidators = [
  Validators.required
]


  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
    }
     }

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      myBedrijfCheckbox: [''],
      firstName: ['',this.nameValidators],
      lastName: ['', this.nameValidators],
      companyName: ['', this.nameValidators],
      email: ['', this.emailValidators],
      password: ['', this.passwordValidators],
      confirmPassword: ['', this.passwordValidators],
      telephone: [''],
      zipCode: [''],
      city: ['', this.commonvalidators],
      description: [''],
      url: [''],
      cvUrl: [''],
      address: ['']

    }, {
      validator: MustMatch('password', 'confirmPassword')
    }
     )

     /*als gebruiker kiest om als bedrijf in te schrijven, voeg ik validatie aan companyname input, description input en url,
     *anders voeg ik vanlidate aan firstname en lastname inputs.
     */

     this.registerForm.get('myBedrijfCheckbox').valueChanges.subscribe(value => {
      if(value) {
        this.isStudent = false;
        console.log(this.isStudent);
        this.registerForm.get('companyName').setValidators(this.nameValidators.concat(Validators.required));
        this.registerForm.get('description').setValidators(this.commonvalidators);
        this.registerForm.get('url').setValidators(this.commonvalidators);
      }else{
        this.isStudent = true;
        console.log(this.isStudent);
        this.registerForm.get('firstName').setValidators(this.nameValidators.concat(Validators.required));
        this.registerForm.get('lastName').setValidators(this.nameValidators.concat(Validators.required));

      }
    }) 
  }

  //get all registerForm controls
  get registerformControls() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;

     //stop here if form is invalid
     console.log(this.isStudent);
       if (this.registerForm.invalid) {
         return;
    }

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
    model.zipCode = Number(controls.zipCode.value);
    model.address = controls.address.value;
    model.city = controls.city.value;

    //de student moet zijn naam, voorname en CV geven.
    if(this.isStudent){
      model.name = controls.lastName.value;
      model.firstName = controls.firstName.value;
      model.cvUrl = controls.cvUrl.value;
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
  studentClicked(){
    this.isStudent = true;
    this.title = "Make a student account"
  }
  //register als bedrijf
  bedrijfClicked() {
    this.isStudent = false;
    this.title = "Make a Company account"
  }


}
