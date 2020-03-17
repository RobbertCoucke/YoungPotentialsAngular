import {
  Component,
  OnInit,
  Inject,
  AfterViewInit,
  ViewChild
} from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog, MatStepper } from "@angular/material";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormControl
} from "@angular/forms";
import { STEPPER_GLOBAL_OPTIONS } from "@angular/cdk/stepper";
import { UploadComponent } from "@/upload/upload.component";
import { DialogData } from "@/vacture-detail/vacture-detail.component";
import { UploadService} from "../_services/upload/upload.service";
import { User } from '@/_models';
import { AuthenticationService } from '@/_services';
import { VacatureService } from '@/_services/Vacature/vacature.service';

@Component({
  selector: "app-sollicitatie-dialog",
  templateUrl: "./sollicitatie-dialog.component.html",
  styleUrls: ["./sollicitatie-dialog.component.scss"]
})
export class SollicitatieDialogComponent implements OnInit {
  checkboxValue: boolean; // checkbox waarde voor algemene voorwaarden
  path: string = null;
  pathBijlage : string = null
  uploadFile: FormData; // we stopen opgeladen bestand in formdata
  uploadBijlage : FormData;

  emailSender = this.data.UseremailValue; // email van de hudige gebruiker
  emailReciever = this.data.companyEmailValue; // email van het bedrijf die vacature plaatste
  currentUser : User;

  test: boolean = false;

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
    private uploadService: UploadService,
    private authenticationService : AuthenticationService,
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

    this.getUserCV();


  }


  getUserCV(){
    this.authenticationService.currentUser.subscribe(u => {
      this.currentUser = u;
      this.uploadService.getFilePath(true, this.currentUser.id).subscribe(path => this.path = path.path);
    })
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

    //override om name uit file te krijgen, anders zegt hij name property not known
    var file : any = formData.get('file');
    this.path = file.name;
  }

  /**
   * @description verwijdert upgeloade file
   */
  removeFile(){
    this.uploadFile = null;
    this.path = null;
  }

  removeBijlage(){
    this.uploadBijlage = null;
    this.pathBijlage = null
  }

  handleUploadBijlage(formData: FormData){
    this.uploadBijlage = formData;
    //override om name uit file te krijgen, anders zegt hij name property not known
    var file : any = formData.get('file');
    this.pathBijlage = file.name;
  }
  @ViewChild('stepper', {static: false}) stepper: MatStepper;
  sendMail(){
    var formData = new FormData(); 
    if(!this.uploadFile){
      formData.append('userId', this.currentUser.id.toString());
    }else{
      formData = this.uploadFile;
    }

    if(this.pathBijlage){
      formData.append('file2', this.uploadBijlage.get('file'));
    }
    formData.append('emailFrom', this.firstFormGroup.controls['senderCtrl'].value);
    formData.append('emailTo', this.emailReciever);
    formData.append('subject', this.secondFormGroup.controls['onderwerpControl'].value);
    formData.append('message',this.secondFormGroup.controls['bodyControl'].value);

    this.vacatureService.soliciteer(formData).subscribe();
    

  }

  stepClick($event) {
    this.stepper.selectionChange.subscribe(selection => {
      console.log(selection.selectedStep)
      console.log(selection.previouslySelectedStep)
   })
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
