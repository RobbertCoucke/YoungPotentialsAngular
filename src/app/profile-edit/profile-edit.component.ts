import { Component, OnInit } from '@angular/core';
import { User } from '@/_models';
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
    }  
        this.updateForm = this.formBuilder.group({
          firstName: [''],
          lastName: [''],
          description: [''],
          city: [''],
          url: [''],
          cvUrl: [''],
          email: [''],
          telefoonn: [''],
          address: [''],
          companyName: [''],
          zipCode: ['']
        })
        this.userservice.getById(this.currentUser.id).subscribe(data => {
          //console.log(data);
          this.id = data.userId;
          //console.log(this.id);
          this.handleData(data);
          //console.log(this.user)
          this.updateform();
          if(this.isStudent)
          {
            this.updateFormStudent();
          }else{
            this.updateFormCompany();
          }
          });
        console.log(this.currentUser);

        if(this.isStudent) {
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
    this.user = new UpdateUser(data.email, data.isStudent);

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

  onSubmit() {
    this.submitted = true;
    console.log(this.updateForm);
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
      model.telephone = controls.telefoonn.value;
      //model.city = controls.city.value;
      model.zipCode = controls.zipCode.value;
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

  updateform()
  {
    this.updateForm.patchValue({
      city: this.user.city,
      zipCode: this.user.zipCode,
      email: this.user.email,
      telefoonn: this.user.telephone,
      address: this.user.address

    })
  }

  updateFormStudent()
  {
    this.updateForm.patchValue({
      firstName: this.user.firstName,
      lastName: this.user.name,
      cvUrl: this.user.cvUrl
    })
  }

  updateFormCompany(){
    this.updateForm.patchValue({
      companyName: this.user.companyName,
      url: this.user.companyName,
      description: this.user.description
    })
  }

}
