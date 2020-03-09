import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { UpdatePasswordRequest } from '@/_models/updatePasswordRequest';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MustMatch } from '@/_helpers/mustMatch';
import { UserService } from '@/_services';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  passwordForm: FormGroup;
  submitted= false;
  token : string;
  email: string;
  updatePasswordModel: UpdatePasswordRequest;
  error: string;


  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder
        , private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      wachtwoord: [''],
      confirmWachtwoord:['']
    })

     this.route.queryParams.subscribe(params => {
      const token = params["token"];
      const email = params["email"];
      this.token = token;
      this.email = email;
    });

    console.log(this.token);
    console.log(this.email);

  }

  setUpdatePasswordModel(){
  }

  onSubmit() {
    this.submitted = true;
    this.setUpdatePasswordModel;
    console.log(this.passwordForm);
    console.log(this.email);
    console.log(this.token);
    /* if(this.passwordForm.invalid)
    {
      console.log(this.passwordForm);
      return;
    } */
    


    /* this.userService.resetPassword(this.updatePasswordModel).subscribe(data =>{
      this.router.navigate(['/']);
      },
      error => {
        this.error = error;} )*/
  } 
}
