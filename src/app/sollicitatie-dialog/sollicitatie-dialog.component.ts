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

  uploadFile: FormData; // we stopen opgeladen bestand in formdata

  emailSender = this.data.UseremailValue; // email van de hudige gebruiker
  emailReciever = this.data.companyEmailValue; // email van het bedrijf die vacature plaatste
  //userHasCV = this.data.userHasCV; // controle of ingelogde user CV heeft
  userHasCV = true; //dummy om CV te simuleren

  /**
   * * FormGroup per step in stepper
   */
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  FourthFormGroup: FormGroup;
  FifthFormGroup: FormGroup;


  disabledAgreement: boolean = true; // value checkbox bij algemene voorwaarden
  editable: boolean = true; // value om navigeren naar step te disabelen


  /**
   * @description formcontrols voor validatie
   */
  senderCtrl = new FormControl(this.emailSender, [
    Validators.required,
    Validators.email
  ]);
  checkboxControl = new FormControl("", [Validators.required]);
  onderwerpControl = new FormControl("", [Validators.required]);
  bodyControl = new FormControl("", [Validators.required]);

  constructor(
    private formBuilder: FormBuilder, 
    /**
     * * Hier laden we data in uit vacature-detail 
     * * We kunnen deze data bereiken via het data veld
     */
    public dialogRef: MatDialogRef<SollicitatieDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit() {
    /**
     * @description Formgroups aanmaken
     */
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
      checkboxControl: this.checkboxControl
    });
  }

  /**
   * 
   * @param event bij click op next
   * @description maakt vorige velden ontoegankelijk
   */
  changeCheck(event) {
    this.disabledAgreement = !event.checked;
  }

  /**
   * 
   * @param formData formdata met upgeloade file
   * @description stopt file in formdata om naar backend te versturen
   */
  handleUpload(formData: FormData) {
    this.uploadFile = formData;
  }

  /**
   * @description verwijdert upgeloade file
   */
  removeFile(){
    this.uploadFile = null;
  }

  /**
   * @description error messages oproepen
   */
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
}
