import { Component, OnInit } from '@angular/core';
import { User } from '@/_models';
import { AuthenticationService } from '@/_services';
import { UserService } from '../_services/User/user.service'
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Register } from '@/_models/register';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.scss']
})
export class ProfileEditComponent implements OnInit {
  updateForm : FormGroup;
  submitted = false;
  error = '';
  currentUser : User;
  user: Register;  
  isStudent : boolean; 

  private emailValidators = [
    Validators.maxLength(250),
    Validators.required,
    Validators.minLength(5),
    Validators.pattern(/.+@.+\..+/)
];

    private nameValidators = [
    Validators.maxLength(50),

];

  private commonvalidators = [
  Validators.required
]
  constructor(private userservice: UserService, private authenticatieService: AuthenticationService,
     private router: Router, private formBuilder : FormBuilder) {
      if (this.authenticatieService.currentUserValue == null) { 
      this.router.navigate(['/']);
    }else{
      this.authenticatieService.currentUser.subscribe(x => this.currentUser = x);
    }  
   }

  ngOnInit() {
        this.updateForm = this.formBuilder.group({
          firstName: [''],
          lastName:[''],
          description: [''],
          city: [''],
          url: [''],
          cvUrl: [''],
          email: [],
          address: [],
          companyName: [],
          zipCode: []
        })
        this.userservice.getById(this.currentUser.id).subscribe(data => {
          console.log(data);
          this.handleData(data);
          });
        console.log(this.currentUser);

        if(this.user.isStudent) {
          console.log(this.isStudent);
          this.updateForm.get('companyName').setValidators(this.nameValidators.concat(Validators.required));
          this.updateForm.get('description').setValidators(this.commonvalidators);
          this.updateForm.get('url').setValidators(this.commonvalidators);
        }else{

          this.updateForm.get('firstName').setValidators(this.nameValidators.concat(Validators.required));
          this.updateForm.get('lastName').setValidators(this.nameValidators.concat(Validators.required));
  
        }


      }

  handleData(data)
  {
    this.user = new Register(data.email, " " , data.isStudent);

    if(data.isStudent)
    {
      this.user.cvUrl = data.cvUrl;
      this.user.firstName = data.firstName;
      this.user.name = data.name;
      this.user.isStudent = true;
    }else{
      this.user.companyName = data.companyName;
      this.user.description = data.description;
      this.user.url = data.url;
      this.user.isStudent = false;
    }

    this.user.city = data.city;
    this.user.telephone = data.telephone;
    this.user.address = data.address;
    this.user.zipCode = data.zipCode;
    this.isStudent = this.user.isStudent;
  }

  get updateFormControls() { return this.updateForm.controls; }

}
