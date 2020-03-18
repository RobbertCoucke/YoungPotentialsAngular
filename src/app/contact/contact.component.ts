import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from  '@angular/forms';
import { Contact } from '@/_models/contact';
import { Subject } from 'rxjs';
import { ContactService } from '@/_services/contact/contact.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  private emailValidators = [
    Validators.maxLength(250),
    Validators.required,
    Validators.pattern(/.+@.+\..+/)
];
  
  contactForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder, private contactService: ContactService, private router: Router) {
    this.createContactForm();
  }

  ngOnInit() { }


  createContactForm(){
    this.contactForm = this.formBuilder.group({
      fullName: [''],  
      email: ['', this.emailValidators],
      subject:[''],
      message: ['']
    });

  }

  //get all contactForm controls
  get cf() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;
    Object.keys(this.contactForm.controls).forEach((key) => this.contactForm.get(key).setValue(this.contactForm.get(key).value.trim()));
    //stop here if form is invalid
    if (this.contactForm.invalid) {
         return;
   }


    console.log( this.contactForm );

        //de contact model krijgen   
    var contactModel = this.getContactModel();

    console.log(this.contactForm);
    this.contactService.sendMail(contactModel).subscribe( data => this.router.navigate(['/']));

        

}

  //get de contact model nadat de gebruiker zijn data ingevuld heeft
  getContactModel(){
    var controls = this.cf;
    //elke user moet zin email, naam, onderwerp en bericht invullen
    var model = new Contact(controls.email.value, controls.fullName.value,
       controls.subject.value, controls.message.value);
   
    return model;
  }


  // dynamisch maken van google maps
  ngAfterViewInit(){
    document.getElementsByClassName('map-wrap')[0].addEventListener("click",function(){
      document.getElementById('google-map').classList.add('clicked');
      console.log('click')
    });

    document.getElementsByClassName('map-wrap')[0].addEventListener("mouseleave",function(){
      document.getElementById('google-map').classList.remove('clicked');
      console.log('click remove')
    });
    
  }
}
