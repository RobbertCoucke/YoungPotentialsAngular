import {
  Component,
  OnInit,
  Inject,
  AfterViewInit,
  ViewChild
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from "@angular/material";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { UploadComponent } from "@/upload/upload.component";
import { DialogData } from "@/vacture-detail/vacture-detail.component";

@Component({
  selector: "app-sollicitatie-dialog",
  templateUrl: "./sollicitatie-dialog.component.html",
  styleUrls: ["./sollicitatie-dialog.component.scss"]
})
export class SollicitatieDialogComponent implements OnInit {
  checkboxValue: boolean; // checkbox waarde voor algemene voorwaarden

  uploadFile: FormData;

  emailSender = this.data.UseremailValue; // email van de hudige gebruiker
  emailReciever = this.data.companyEmailValue; // email van het bedrijf die vacature plaatste

  /**
   * * FormGroup per step in stepper
   */
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  FourthFormGroup: FormGroup;
  FifthFormGroup: FormGroup;

  disabledAgreement: boolean = true;
  disableFile: boolean = true;
  editable: boolean = true;

  senderCtrl = new FormControl(this.emailSender, [
    Validators.required,
    Validators.email
  ]);
  checkbox = new FormControl("", [Validators.required]);
  onderwerpControl = new FormControl("", [Validators.required]);
  bodyControl = new FormControl("", [Validators.required]);

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SollicitatieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      senderCtrl: this.senderCtrl
    });

    this.secondFormGroup = this.formBuilder.group({
      onderwerpControl: this.onderwerpControl,
      bodyControl: this.bodyControl
    });
    this.thirdFormGroup = this.formBuilder.group({});
    this.FourthFormGroup = this.formBuilder.group({});
    this.FifthFormGroup = this.formBuilder.group({
      checkbox: this.checkbox
    });
  }

  changeCheck(event) {
    this.disabledAgreement = !event.checked;
  }

  handleUpload(formData: FormData) {
    this.uploadFile = formData;
  }

  removeFile(){
    this.uploadFile = null;
  }

  // checkFile(event) {
  //   if (this.hasFile === true){
  //     console.log("heeft file");
  //   }
  //   else {
  //     console.log("Geen file");
  //   }
  //   //this.disableFile = !event.checked;
  // }

  getErrorMessageEmail() {
    return this.senderCtrl.hasError("required")
      ? "U moet een email opgeven"
      : this.senderCtrl.hasError("email")
      ? "Geen geldige email"
      : "";
  }

  getErrorMessageRequiredOnderwerp() {
    return this.onderwerpControl.hasError("required")
      ? "Veld is verplicht"
      : "";
  }

  getErrorMessageRequiredBody() {
    return this.bodyControl.hasError("required") ? "Veld is verplicht" : "";
  }

  str: string;
  sendValues(): void {
    console.log(this.str);
  }
}
