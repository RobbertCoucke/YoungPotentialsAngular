import { Opleiding } from "./../_models/opleiding";
import { StudieGebied } from "./../Model/StudieGebied";
import { StudiegebiedService } from "@/_services/studiegebied/studiegebied.service";
import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray, Form } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatSelectChange } from "@angular/material";
import cities from "../../assets/cities.json";
import { Studiegebied } from "app/_models/studiegebied";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import {AuthenticationService} from '../_services/Authentication/authentication.service'
import { User, Company } from '@/_models';
import { Router } from '@angular/router';
import {UserService} from '../_services/User/user.service'
import { UploadService } from '@/_services/upload/upload.service';
import { VacatureService } from '@/_services/Vacature/vacature.service';
import { Vacature } from '@/_models/vacature';

/**
 * * Interfaces
 */

export interface Afstudeerrichting {
  name: string;
  viewValue: string;
}

export interface Keuze {
  value: number;
  name: string;
  viewValue: string;
}

export interface Stad {
  name: string;
}

@Component({
  selector: "app-reactive-form",
  templateUrl: "./reactive-form.component.html",
  styleUrls: ["./reactive-form.component.scss"]
})
export class ReactiveFormComponent implements OnInit {
  uploadVacForm: FormGroup; // Aanmaken formgroup om alle values van form in 1 object/group te stoppen

  steden: Stad[]; // Array met alle steden in België
  filteredSteden: Observable<Stad[]>; // Array met alle steden in België gefilterd

  /**
   * Formcontrols
   */
  locatieControl = new FormControl("", Validators.required);
  studiegebiedControl = new FormControl("", Validators.required);
  opleidingControl = new FormControl("", Validators.required);
  titel = new FormControl("", [Validators.required]);
  email = new FormControl("", [Validators.required, Validators.email]);
  bedrijfsnaam = new FormControl("", [Validators.required]);
  beschrijving = new FormControl("", [Validators.required]);
  vacatureBestand = new FormControl("", [Validators.required]);
  einddatum = new FormControl("", [Validators.required]);
  typeControl = new FormControl("", Validators.required);

  submitted = false; // false: form niet submited | true: form submitted

  selectedSTG: string; // waarde van geselecteerde studiegebied
  selectedopleiding: string; // waarde geselecteerde opleiding
  locatieValue: any; //waarde van geselecteerde locatie
  titleValue : string;
  emailValue: string;
  descriptionValue: string;
  dateValue: any;
  companyValue: any;
  currentUser: User;
  company: Company;
  uploadFile: FormData;
  selectValue: any;
  tags: Studiegebied[];

  minDate: Date; // min datum datepicker
  maxDate: Date; // max datum datepicker

  /**
   * @description Array met types
   */
  types: Array<any> = [
    { name: "Vacature", value: "Vacature" },
    { name: "Stage", value: "Stage" },
    { name: "Vrijwilligerswerk", value: "Vrijwilligerswerk" }
  ];

  studiegebieden: any[] = []; // declaratie array voor in te laden studiegebieden

  constructor(
    private fb: FormBuilder,
    private studiegebiedService: StudiegebiedService,
    private authenticationService: AuthenticationService,
    private router: Router,
    private userService: UserService,
    private uploadService: UploadService,
    private vacatureService: VacatureService
  ) {
    this.steden = cities;
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate()); // min datum is de dag zelf
    this.maxDate.setDate(this.maxDate.getDate() + 182); // we stellen de maxium datum in op 6 maanden = 182 dagen
    this.studiegebiedService.getAllStudieGebieds().subscribe(data => {
      this.studiegebieden = data;
    }); // inladen alle studiegebieden uit db

    
  }

  ngOnInit() {

    console.log("subscribe to user");
    this.authenticationService.currentUser.subscribe(u =>{
      console.log("in user!!");
      console.log(u);
      if(u.role === 'Company'){
          this.currentUser = u;
          this.userService.getById(u.id).subscribe(c => {
            this.company = c;
            console.log(c);
          });
      }else{
        this.router.navigate(['/']);
      }
      
    });


    /**
     * @description filteren steden op naam
     */
    this.filteredSteden = this.locatieControl.valueChanges.pipe(
      startWith(""),
      map(value => (typeof value === "string" ? value : value.name)),
      map(name => (name ? this._filter(name) : this.steden.slice()))
    );

    /**
     * @description formvalidatie in groep
     */
    this.uploadVacForm = this.fb.group({
      locatieControl : new FormControl("", Validators.required),
      studiegebiedControl : new FormControl("", Validators.required),
      opleidingControl : new FormControl("", Validators.required),
      titel : new FormControl("", [Validators.required]),
      email : new FormControl("", [Validators.required, Validators.email]),
      bedrijfsnaam : new FormControl("", [Validators.required]),
      beschrijving : new FormControl("", [Validators.required]),
      vacatureBestand : new FormControl("", [Validators.required]),
      einddatum : new FormControl("", [Validators.required]),
      typeControl : new FormControl("", Validators.required)
    });
  }

  /**
   * @description toont de huidige geselecteerde stad in selectieveld
   * @param stad
   * @return naam van geselecteerde stad
   */
  displayLocatie(stad: Stad): string {
    return (stad && stad.name) ? stad.name : stad.name;
  }

  /**
   * @description filteren steden
   * @param name naam van stad
   * @return een array met geselecteerde steden
   */
  private _filter(name: string): Stad[] {
    const filterValue = name.toLowerCase();

    return this.steden.filter(
      option => option.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  /**
   * @description retourneert value van formvelden
   * @return object met values form
   */
  get uploadVacFormControl() {
    return this.uploadVacForm.controls;
  }

  /**
   * @description post de values van formvelden in console
   * @param uploadVacForm form
   */
  onSubmit(uploadVacForm) {

    console.log(this.selectedSTG);
    console.log(this.selectedopleiding);
    console.log(this.tags);

    var vacature = new Vacature({title: this.titleValue,
                                 description: this.descriptionValue,
                                email: this.emailValue,
                                city: this.locatieValue,
                                typeId: 0,
                                companyId: this.company.id});
    vacature.tags = this.tags;

    if(this.uploadFile){
      this.uploadFile.append("isUser", "false");
      this.uploadFile.append("id", this.company.id.toString());
    }

    console.log(vacature);
    this.vacatureService.createVacature(vacature).subscribe(v => {
      console.log("created vacature");
      if(this.uploadFile){
        console.log(this.uploadFile);
      this.uploadService.upload(this.uploadFile).subscribe();
      }
      this.router.navigate(['/']);
    });
    
    
  }

  handleUpload(formData: FormData){
    this.uploadFile = formData;
  }

  handleStudiegebieden(studiegebieden: Studiegebied[]){
    this.tags = studiegebieden;
  }

  removeFile(){
    this.uploadFile = null;
  }


  /**
   * @description veranderen value huidige geselecteerde locatie
   * @param event$
   */
  onSelectionChangedLocatie(event$) {
    this.locatieValue = event$.option.value.name;
  }

  /**
   * @description error messages die worden opgeroepen bij een invalid veld
   * @return een error message
   */
  getErrorMessageTitel() {
    return this.titel.hasError("required") ? "U moet een titel opgeven" : "";
  }

  getErrorMessageEmail() {
    return this.email.hasError("required")
      ? "U moet een email opgeven"
      : this.email.hasError("email")
      ? "Geen geldige email"
      : "";
  }

  getErrorMessageBedrijfsnaam() {
    return this.titel.hasError("required")
      ? "U moet een bedrijfsnaam opgeven"
      : "";
  }

  getErrorMessageBeschrijving() {
    return this.titel.hasError("required")
      ? "U moet een beschrijving opgeven"
      : "";
  }

  getErrorMessagelocatieControl() {
    return this.locatieControl.hasError("required")
      ? "U moet een locatie selecteren"
      : "";
  }

  getErrorMessageVacatureBestand() {
    return this.vacatureBestand.hasError("required")
      ? "Je moet een bestand uploaden"
      : "";
  }

  getErrorMessagestudiegebiedControl() {
    return this.studiegebiedControl.hasError("required")
      ? "U moet een studiegebied selecteren"
      : "";
  }

  getErrorMessageopleidingControl() {
    return this.opleidingControl.hasError("required")
      ? "U moet een opleiding selecteren"
      : "";
  }

  getErrorMessageEinddatumControl() {
    return this.einddatum.hasError("required")
      ? "U moet een einddatum selecteren"
      : "";
  }

  getErrorMessageTypeControl() {
    return this.typeControl.hasError("required")
      ? "U moet minstens 1 type selecteren"
      : "";
  }
}
