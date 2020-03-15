import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from  '@angular/forms';
import { Contact } from '@/_models/contact';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  
  contactForm: FormGroup;
  submitted = false;
  constructor(private formBuilder: FormBuilder) {
    this.createContactForm();
  }


  createContactForm(){
    this.contactForm = this.formBuilder.group({
      fullName: [''],  
      email: [''],
      subject:[''],
      message: ['']
    });

  }

  //get all contactForm controls
  get contactformControls() { return this.contactForm.controls; }

  onSubmit() {
    this.submitted = true;

    //stop here if form is invalid
           if (this.contactForm.invalid) {
         return;
   }

    console.log( this.contactForm.controls.value );

        //de contact model krijgen   
        var contactModel = this.getContactModel();

        console.log(this.contactForm);

        

}

  //get de contact model nadat de gebruiker zijn data ingevuld heeft
  getContactModel(){
    var controls = this.contactformControls;
    //elke user moet zin email, naam, onderwerp en bericht invullen
    var model = new Contact(controls.email.value, controls.fullName.value,
       controls.subject.value, controls.message.value);
   
    return model;
  }

  ngOnInit() { }

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
