import { Opleiding } from "./../_models/opleiding";
import { StudieGebied } from "./../Model/StudieGebied";
import { StudiegebiedService } from "@/_services/studiegebied/studiegebied.service";
import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatSelectChange } from "@angular/material";
import cities from "../../assets/cities.json";
import { Studiegebied } from "app/_models/studiegebied";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

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
  styleUrls: ["./reactive-form.component.css"]
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

  minDate: Date; // min datum datepicker
  maxDate: Date; // max datum datepicker

  /**
   *  arrays die opgevuld zullen met data uit db/dummy data afhankelijk van user input
   */
  // keuzeSTB: Studiegebied[];
  keuzeO: Opleiding[];
  keuzeA: Afstudeerrichting[];
  keuzeK: Keuze[];

  public edited = false;

  types: Array<any> = [
    { name: "Vacature", value: "Vacature" },
    { name: "Stage", value: "Stage" },
    { name: "Vrijwilligerswerk", value: "Vrijwilligerswerk" }
  ];

  studiegebieden: any[] = [];

  // ! einde dummy data

  constructor(
    private fb: FormBuilder,
    private studiegebiedService: StudiegebiedService
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
      titel: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      bedrijfsnaam: ["", Validators.required],
      locatie: [this.locatieControl.value, Validators.required],
      beschrijving: ["", Validators.required],
      vacaturebestand: ["", Validators.required],
      einddatum: ["", Validators.required]
    });
  }

  /**
   *
   * @description Weergeven studiegebieden
   *
   */
  testshowSTG() {
    this.studiegebieden.forEach(element => {
      //console.log(element.id + " " + element.studiegebied1);
      console.log(element.opleiding);
      // element.opleiding.forEach(element => {
      //     console.log(element);
      // });
    });
  }

  /**
   * @description vult de lijsten op basis van geselecteerd studiegebied
   * @param opleiding geselecteerd studiegebied
   */
  // changeOpleidingDiv(studiegebied) {
  //   if (this.selectedSTG == "handelswetenschappen en bedrijfskunde") {
  //     this.keuzeA = this.AfstudeerrichtingenHantal;
  //     this.keuzeO = this.opleidingenHantal;
  //     this.keuzeK = this.KeuzesHantal;
  //   } else if (this.selectedSTG == "biotechniek") {
  //     this.keuzeA = this.AfstudeerrichtingBio;
  //     this.keuzeO = this.opleidingenBio;
  //     this.keuzeK = this.KeuzesBio;
  //   }
  //   this.selectedopleiding = undefined;
  // }

  changeOpleidingDiv(studiegebied) {
    this.edited = true;
  }

  /**
   * @description toont de huidige geselecteerde stad in selectieveld
   * @param stad
   * @return naam van geselecteerde stad
   */
  displayLocatie(stad: Stad): string {
    return stad && stad.name ? stad.name : stad.name;
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
    console.log(this.uploadVacForm.value);
  }

  /**
   * @description veranderen value huidige geselecteerde locatie
   * @param event$
   */
  onSelectionChangedLocatie(event$) {
    this.locatieValue = event$.option.value.name;
  }

  /**
   * @description houdt de geselecteerde afstudeerrichtingen bij en post deze in de console
   * @param event wanneer de selectie wordt aangepast
   */
  changeRatio(event: MatSelectChange) {
    console.log(event.value);
  }

  onCheckboxChange(e) {
    const checkArray: FormArray = this.uploadVacForm.get(
      "checkArray"
    ) as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i: number = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value == e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
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
