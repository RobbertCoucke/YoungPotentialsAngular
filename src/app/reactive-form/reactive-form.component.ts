import { Component, OnInit } from "@angular/core";
import { Validators, FormGroup, FormBuilder, FormArray } from "@angular/forms";
import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { MatSelectChange } from "@angular/material";
import cities from "../../assets/cities.json";

/**
 * * Interfaces
 */
export interface Opleiding {
  name: string;
}

export interface Afstudeerrichting {
  name: string;
  viewValue: string;
}

export interface Keuze {
  value: number;
  name: string;
  viewValue: string;
}

export interface Food {
  value: string;
  viewValue: string;
}

export interface Stad {
  name: string;
}

export interface Studiegebied {
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

  submitted = false; // false: form niet submited | true: form submitted

  selectedSTG: string; // waarde van geselecteerde studiegebied
  selectedopleiding: string; // waarde geselecteerde opleiding
  locatieValue: any; //waarde van geselecteerde locatie

  minDate: Date; // min datum datepicker
  maxDate: Date; // max datum datepicker

  /**
   *  arrays die opgevuld zullen met data uit db/dummy data afhankelijk van user input
   */
  keuzeSTB: Studiegebied[];
  keuzeO: Opleiding[];
  keuzeA: Afstudeerrichting[];
  keuzeK: Keuze[];

  /**
   * ! dummy data
   */
  opleidingenHantal: Opleiding[] = [
    { name: "Bedrijfsmanagement" },
    { name: "Office Management" },
    { name: "Toegepaste Informatica" }
  ];

  opleidingenBio: Opleiding[] = [{ name: "Agro- en biotechnologie" }];

  AfstudeerrichtingBio: Afstudeerrichting[] = [
    { name: "Agro-industrie", viewValue: "Agro- en biotechnologie" },
    { name: "Landbouw", viewValue: "Agro- en biotechnologie" }
  ];

  KeuzesBio: Keuze[] = [
    { value: 1, name: "Algemene Landbouw", viewValue: "Landbouw" },
    { value: 2, name: "Landbouwmechanisatie", viewValue: "Landbouw" },
    { value: 3, name: "Agro-industrie", viewValue: "Agro-industrie" }
  ];

  AfstudeerrichtingenHantal: Afstudeerrichting[] = [
    { name: "Softwaremanagement", viewValue: "Toegepaste Informatica" },
    { name: "Applicatie-ontwikkeling", viewValue: "Toegepaste Informatica" },
    { name: "Business & Languages", viewValue: "Office Management" },
    {
      name: "Business Translation & Interpreting",
      viewValue: "Office Management"
    },
    { name: "Human Resources Management", viewValue: "Office Management" },
    { name: "Medical Office Management", viewValue: "Office Management" },
    { name: "Accountancy-fiscaliteit", viewValue: "Bedrijfsmanagement" },
    { name: "Automotive Management", viewValue: "Bedrijfsmanagement" },
    {
      name: "Business Management & Entrepreneurschip",
      viewValue: "Bedrijfsmanagement"
    },
    { name: "Event Management", viewValue: "Bedrijfsmanagement" }
  ];

  KeuzesHantal: any[] = [
    {
      value: 1,
      name: "Artificial Intelligence",
      viewValue: "Applicatie-ontwikkeling"
    },
    {
      value: 2,
      name: "Networks & Security",
      viewValue: "Applicatie-ontwikkeling"
    },
    {
      value: 3,
      name: "Software development",
      viewValue: "Applicatie-ontwikkeling"
    },
    { value: 4, name: "Business & IT", viewValue: "Softwaremanagement" },
    {
      value: 5,
      name: "Business Administration Management",
      viewValue: "Business & Languages"
    },
    { value: 6, name: "Business Events", viewValue: "Event Management" },
    {
      value: 8,
      name: "Accountancy-fiscaliteit",
      viewValue: "Accountancy-fiscaliteit"
    },
    {
      value: 9,
      name: "Automotive Management",
      viewValue: "Automotive Management"
    },
    {
      value: 10,
      name: "Business Management & Entrepreneurschip",
      viewValue: "Business Management & Entrepreneurschip"
    },
    {
      value: 11,
      name: "Business Translation & Interpreting",
      viewValue: "Business Translation & Interpreting"
    },
    {
      value: 12,
      name: "Human Resources Management",
      viewValue: "Human Resources Management"
    },
    {
      value: 13,
      name: "Medical Office Management",
      viewValue: "Medical Office Management"
    }
  ];

  studiegebieden: Studiegebied[] = [
    { name: "biotechniek" },
    { name: "onderwijs" },
    { name: "gezondheidszorg" },
    { name: "industriële wetenschappen en technologie" },
    { name: "sociaal-agogisch werk" },
    { name: "handelswetenschappen en bedrijfskunde" }
  ];

  // ! einde dummy data

  constructor(private fb: FormBuilder) {
    this.steden = cities;
    this.minDate = new Date();
    this.maxDate = new Date();
    this.minDate.setDate(this.minDate.getDate()); // min datum is de dag zelf
    this.maxDate.setDate(this.maxDate.getDate() + 182); // we stellen de maxium datum in op 6 maanden = 182 dagen
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
      vacatureCB: [false, Validators.required],
      stageCB: [false, Validators.required],
      vrijwilligerswerkCB: [false, Validators.required],
      einddatum: ["", Validators.required]
    });
  }
  /**
   * @description vult de lijsten op basis van geselecteerd studiegebied
   * @param opleiding geselecteerd studiegebied
   */
  changeOpleidingDiv(studiegebied) {
    if (this.selectedSTG == "handelswetenschappen en bedrijfskunde") {
      this.keuzeA = this.AfstudeerrichtingenHantal;
      this.keuzeO = this.opleidingenHantal;
      this.keuzeK = this.KeuzesHantal;
    } else if (this.selectedSTG == "biotechniek") {
      this.keuzeA = this.AfstudeerrichtingBio;
      this.keuzeO = this.opleidingenBio;
      this.keuzeK = this.KeuzesBio;
    }

    this.selectedopleiding = undefined;
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
}
