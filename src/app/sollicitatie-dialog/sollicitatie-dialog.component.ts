import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';

@Component({
  selector: 'app-sollicitatie-dialog',
  templateUrl: './sollicitatie-dialog.component.html',
  styleUrls: ['./sollicitatie-dialog.component.scss']
})
export class SollicitatieDialogComponent implements OnInit{

  emailSender = "sender@gmail.com";
  emailReciever = "reciever@gmail.com"

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  disabledAgreement: boolean = true;
  editable: boolean = true;

  senderCtrl = new FormControl(this.emailSender, [Validators.required, Validators.email]);
  checkbox = new FormControl("", [Validators.required]);

  constructor(private formBuilder: FormBuilder) {
  }

  ngOnInit() {

    this.firstFormGroup = this.formBuilder.group({
      'senderCtrl': this.senderCtrl
    });


    this.secondFormGroup = this.formBuilder.group({
      fileupload: ['']
    });
    this.thirdFormGroup = this.formBuilder.group({
      'checkbox': this.checkbox
    });
  }

  changeCheck(event){
    this.disabledAgreement = !event.checked;
  }

  getErrorMessageEmail() {
    return this.senderCtrl.hasError("required")
      ? "U moet een email opgeven"
      : this.senderCtrl.hasError("email")
      ? "Geen geldige email"
      : "";
  }

  str: string;
sendValues(): void {
  console.log(this.str);
}
}

