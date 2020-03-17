import { Component, OnInit } from '@angular/core';
import { User, Role } from '@/_models';
import { AuthenticationService } from '@/_services';
import { UserService } from '../_services/User/user.service'
import { Router } from '@angular/router';
import { from } from 'rxjs';
import { Register } from '@/_models/register';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UpdateUser } from '@/_models/updateUser';

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
  user: UpdateUser;  
  id: number;
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
     private router: Router, private formBuilder : FormBuilder){
   }

  ngOnInit() {
    if (this.authenticatieService.currentUserValue == null) { 
      alert("Invalid action.");
      this.router.navigate(['/']);
    }else{
      this.authenticatieService.currentUser.subscribe(x => this.currentUser = x);
      if(this.currentUser.role == Role.Admin)
      {
        this.router.navigate(['/']);
      }else{
        this.updateForm = this.formBuilder.group({
          firstName: [''],
          lastName: [''], 
          website: [''],
          email: [''],
          address: [''],
          companyName: ['']
        })
        this.userservice.getById(this.currentUser.id).subscribe(data => {
          this.id = data.userId;
          this.handleData(data);
          console.log(data);
          this.updateform();
          if(!this.isStudent)
          {
            this.updateForm.get('companyName').setValidators(this.nameValidators.concat(Validators.required));
            this.updateForm.get('website').setValidators(this.commonvalidators);
            this.updateForm.get('city').setValidators(this.commonvalidators);
            this.updateForm.get('adress').setValidators(this.commonvalidators);
            this.updateFormCompany();
          }else{
            this.updateFormStudent();
            
            this.updateForm.get('firstName').setValidators(this.nameValidators.concat(Validators.required));
            this.updateForm.get('lastName').setValidators(this.nameValidators.concat(Validators.required));
          }
          });
      }
        }
      }

  handleData(data)
  {
    this.user = new UpdateUser(data.email, data.isStudent);

    if(data.isStudent)
    {
      this.user.firstName = data.firstName;
      this.user.name = data.name;
    }else{
      this.user.companyName = data.companyName;
      this.user.url = data.url;
    }

    this.user.city = data.city;
    this.user.address = data.address;
    this.isStudent = this.user.isStudent;
  }

  get updateFormControls() { return this.updateForm.controls; }

  onSubmit() {
    this.submitted = true;
    Object.keys(this.updateForm.controls).forEach((key) => this.updateForm.get(key).setValue(this.updateForm.get(key).value.trim()));
    if(this.updateForm.invalid)
    {
      return;
    }
       var updateModel = this.getModel();
      this.userservice.updateUser(this.id ,updateModel).subscribe( data => {
        this.router.navigate([""]);
      }, 
      error => {
        this.error = error;
      }) 
    


  }

    //get de register model nadat de gebruiker zijn data ingevuld heb
    getModel(){
      var controls = this.updateFormControls;
      //elke gebruiker moet zin email, password invullen
      var model = new UpdateUser(controls.email.value, this.isStudent);
  
      //de student moet zijn naam, voorname en CV geven.
      if(this.isStudent){
        model.name = controls.lastName.value;
        model.firstName = controls.firstName.value;
      }
      //bedrijf moet een beschrijving, url en naam geven
      else{
        model.address = controls.address.value;
        model.city = controls.city.value;
        model.url = controls.website.value;
        model.companyName = controls.companyName.value;
      }
  
      return model;
  
    }

  updateform()
  {
    this.updateForm.patchValue({
      city: this.user.city,
      email: this.user.email,

    })
  }

  updateFormStudent()
  {
    this.updateForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.name
    })
  }

  updateFormCompany(){
    this.updateForm.patchValue({
      companyName: this.user.companyName,
      website: this.user.url,
      address: this.user.address
    })
  }

}
