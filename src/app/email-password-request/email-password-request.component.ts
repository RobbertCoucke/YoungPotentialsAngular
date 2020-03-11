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
    this.emailForm = this.formBuilder.group({
      email: ['']
    })
  }

  onSubmit()
  {
    if(this.emailForm.invalid)
    {
      return;
    }

    var email = this.emailForm.controls.email.value;
    console.log(email);
    const emrq = new EmailRequest(email);
    console.log(emrq);

    this.userService.forgotPassword(emrq).subscribe(data => {
      //this.error = false;
      this.router.navigate(['/message']);
    },
    error => {
      console.log(error);
      this.error = error;
    })
  }

}
