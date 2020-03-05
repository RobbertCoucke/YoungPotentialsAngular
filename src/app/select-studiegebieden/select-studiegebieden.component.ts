import { Component, NgModule, ViewChild, OnInit } from "@angular/core";
import { StudiegebiedService } from "@/_services/studiegebied/studiegebied.service";
import { OpleidingStudiegebied } from "@/_models/opleidingStudiegebied";

export interface Stgebied {
  name: string;
  ID: string;
}

export interface OPL {
  name: string;
  stgID: string;
}

@Component({
  selector: "app-select-studiegebieden",
  templateUrl: "./select-studiegebieden.component.html",
  styleUrls: ["./select-studiegebieden.component.scss"]
})
export class SelectStudiegebiedenComponent implements OnInit {
  studiegebieden: any[] = []; // Array met studiegebied objecten
  stgName: Stgebied[];
  oplName: OPL[];
  totaal: OpleidingStudiegebied[] = [];

  opleidingName: string;
  IDSTG: string;
  studiegebiedName: string;
  studiegebiedID: string;

  selectedOpleiding: string;

  constructor(private studiegebiedService: StudiegebiedService) {
    this.studiegebiedService.getAllStudieGebieds().subscribe(data => {
      this.studiegebieden = data;
      this.opvullenArray();
    }); // inladen alle studiegebieden uit db
  }

  ngOnInit() {}

  /**
   * @description opvullen array
   */
  opvullenArray() {
    this.studiegebieden.forEach(element => {
      this.studiegebiedName = element.studiegebied1;
      this.studiegebiedID = element.id;

      var arr: Stgebied[] = [
        { name: this.studiegebiedName, ID: this.studiegebiedID }
      ];
      this.stgName = arr;

      element.opleiding.forEach(elementa => {
        this.opleidingName = elementa.naamOpleiding;
        this.IDSTG = elementa.idStudiegebied;

        var arrOpl: OPL[] = [{ name: this.opleidingName, stgID: this.IDSTG }];
        this.oplName = arrOpl;
        if (elementa.idStudiegebied === element.id) {
          console.log("begin");
          var object = new OpleidingStudiegebied();
          object.opleidingsnaam = elementa.naamOpleiding;
          object.studiegebied = element.studiegebied1;
          this.totaal.push(object);
          this.selectedOpleiding = elementa.naamOpleiding;
        }
      });
    });
  }
}
