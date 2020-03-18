/**
 * ! Gebruikte documentatie:
 * ! Dialoogbox --> Material Angular Dialog: https://material.angular.io/components/dialog/overview
 * ! Stepper --> Material Angular Stepper: https://material.angular.io/components/stepper/overview
 */

import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { DialogData } from "@/vacture-detail/vacture-detail.component";
import { UploadService } from "../_services/upload/upload.service";
import { User } from "@/_models";
import { AuthenticationService } from "@/_services";
import { VacatureService } from "@/_services/Vacature/vacature.service";

@Component({
  selector: "app-sollicitatie-dialog",
  templateUrl: "./sollicitatie-dialog.component.html",
  styleUrls: ["./sollicitatie-dialog.component.scss"]
})
export class SollicitatieDialogComponent implements OnInit {
  checkboxValue: boolean; // checkbox waarde voor algemene voorwaarden
  path: string = null; // veld om pad van cv in op te slaan
  pathBijlage: string = null; //veld om pad bijlage in op te slaan
  uploadFile: FormData; // we stopen opgeladen bestand in formdata - formdata(key&value pairs) wordt doorgestuurd naar backend
  uploadBijlage: FormData; //we stoppen opgeladen bijlage in formdata

  emailSender = this.data.UseremailValue; // email van de hudige gebruiker
  emailReciever = this.data.companyEmailValue; // email van het bedrijf die vacature plaatste
  currentUser: User; // huidig ingelogde gebruiker

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
    private vacatureService: VacatureService,
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
   * @param event bij click op next
   * @description maakt vorige velden ontoegankelijk
   */
  changeCheck(event) {
    this.disabledAgreement = !event.checked;
  }

  /**
   * @param formData formdata met upgeloade file
   * @description stopt file in formdata om naar backend te versturen
   */
  handleUpload(formData: FormData) {
    this.uploadFile = formData;

    //override om name uit file te krijgen, anders zegt hij name property not known
    var file: any = formData.get("file");
    this.path = file.name;
  }

  /**
   * @description verwijdert upgeloade file
   */
  removeFile() {
    this.uploadFile = null;
    this.path = null;
  }

  /**
   * @description verwijdert upgeloade bijlage
   */
  removeBijlage() {
    this.uploadBijlage = null;
    this.pathBijlage = null;
  }

  /**
   * @param formData om upgeloade file in op te slaan
   * @description we stopopen file in formdata om naar backend te sturen
   */
  handleUploadBijlage(formData: FormData) {
    this.uploadBijlage = formData;
    //override om name uit file te krijgen, anders zegt hij name property not known
    var file: any = formData.get("file");
    this.pathBijlage = file.name;
  }

  /**
   * @description versturen mailgegevens naar backend
   *  Upgeloade file, onderwerp en body worden in een FormData object gestopt
   */
  sendMail() {
    var formData = new FormData();
    if (!this.uploadFile) {
      formData.append("userId", this.currentUser.id.toString());
    } else {
      formData = this.uploadFile;
    }

    if (this.pathBijlage) {
      formData.append("file2", this.uploadBijlage.get("file"));
    }
    formData.append(
      "emailFrom",
      this.firstFormGroup.controls["senderCtrl"].value
    );
    formData.append("emailTo", this.emailReciever);
    formData.append(
      "subject",
      this.secondFormGroup.controls["onderwerpControl"].value
    );
    formData.append(
      "message",
      this.secondFormGroup.controls["bodyControl"].value
    );
    this.vacatureService.soliciteer(formData).subscribe();
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
