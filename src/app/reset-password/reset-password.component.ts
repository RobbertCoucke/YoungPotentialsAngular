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
  showError = false;
  updatePasswordModel: UpdatePasswordRequest;
  error: string;


  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder
        , private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.passwordForm = this.formBuilder.group({
      wachtwoord: [''],
      confirmWachtwoord:['']
    }, {
      validator: MustMatch('wachtwoord', 'confirmWachtwoord')
    })

     this.route.queryParams.subscribe(params => {
      //de gestuurde token die in de backend gemaakt werd, en in de url geplaats is
      const token = params["token"];
      //gebruiker email
      const email = params["email"];
      this.token = token;
      this.email = email;
      //het gaat niet luken om een wachtwoord te veranderen als er geen valid token is
    });

  }

   get updateFormControls() { return this.passwordForm.controls; }

  onSubmit() {
    //als er geen password ingevuld is, mag niet een request naar api sturen
     if(this.passwordForm.invalid)
    {
      console.log(this.passwordForm);
      return;
    } 
    
    var controls = this.updateFormControls;
    //een object maken met de nieuwe password
    this.updatePasswordModel = new UpdatePasswordRequest(this.email,this.token, controls.wachtwoord.value);

    //de nieuwe object de backend sturen en vandaar wordt in de database aangepast 
      this.userService.resetPassword(this.updatePasswordModel).subscribe(data =>{
      this.router.navigate(["/succes-message"]);
      },
      error => {
        console.log(error);
        this.showError = true;
        this.error = error;} )
  } 
}
