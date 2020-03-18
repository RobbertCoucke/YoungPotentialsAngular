import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserService } from '@/_services';
import { EmailRequest } from '@/_models/emailRequest';
import { Router } from '@angular/router';

@Component({
  selector: 'app-email-password-request',
  templateUrl: './email-password-request.component.html',
  styleUrls: ['./email-password-request.component.scss']
})
export class EmailPasswordRequestComponent implements OnInit {
  emailForm: FormGroup;
  submitted = false;
  error : string;
  showMessage = false;

  constructor(private formBuilder: FormBuilder
    , private userService: UserService, private router: Router) { }

  ngOnInit() {
    //emailform
    this.emailForm = this.formBuilder.group({
      email: ['']
    })
  }

  
  onSubmit()
  {
    //als de email niet ingevuld is, dan wordt geen request gestuurd om password te veranderen 
    if(this.emailForm.invalid)
    {
      return;
    }

    //de ingevulde email
    var email = this.emailForm.controls.email.value;
    //EmailRequest object maken
    const emrq = new EmailRequest(email);

    //request naar het api sturen
    this.userService.forgotPassword(emrq).subscribe(data => {
      this.router.navigate(['/message']);
    },
    error => {
      this.error = error;
    })
  }

}
