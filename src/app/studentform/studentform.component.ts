import { Component, OnInit, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '@/_services';
import { SectorService } from '@/_services/Sector/sector.service';
import { MustMatch } from '@/_helpers/mustMatch';
import { EventEmitter } from '@angular/core';
import { Register } from '@/_models/register';

@Component({
  selector: 'app-studentform',
  templateUrl: './studentform.component.html',
  styleUrls: ['./studentform.component.scss']
})
export class StudentformComponent implements OnInit {

  submitted = false;
  @Output() register : EventEmitter<Register> = new EventEmitter<Register>();

  @Input() studentForm: FormGroup;
  error: string;

  private emailValidators = [
    Validators.maxLength(250),
    Validators.required,
    Validators.pattern(/.+@.+\..+/)
];

  private passwordValidators = [
    Validators.minLength(6),
    Validators.required
  ];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private sectorService: SectorService) {
      // redirect to home if already logged in
      if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['/']);
    }

  }
  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      firstName : [''],
      lastName: [''],
      email: ['', this.emailValidators],
      password: ['', this.passwordValidators],
      confirmPassword: ['', this.passwordValidators]

    },
    
      {
        validator: MustMatch('password', 'confirmPassword')
      }
    
    )
      
  }
  get studentFormControls() { return this.studentForm.controls; }

  onSubmit()
  {
    this.submitted = true;

    if (this.studentForm.invalid) {
      console.log(this.studentForm)
      this.error = "invalid form";
      return;
    } 

    var model = this.getStudent();

    this.register.emit(model);

  }

  getStudent()
  {
    var controls = this.studentFormControls;
    //elke gebruiker moet zin email, password invullen
    var model = new Register(controls.email.value, controls.password.value, true);

      model.name = controls.lastName.value;
      model.firstName = controls.firstName.value;

    return model;
  }



}
