import { Component, NgModule, ViewChild, OnInit, Output } from "@angular/core";
import { StudiegebiedService } from "@/_services/studiegebied/studiegebied.service";
import { OpleidingStudiegebied } from "@/_models/opleidingStudiegebied";
import { EventEmitter } from '@angular/core';
import { Studiegebied } from '../_models/studiegebied';

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

  tags: any[];

  @Output() handleStudiegebieden: EventEmitter<Studiegebied[]> = new EventEmitter<Studiegebied[]>();

  selectedOpleiding: string[];

  constructor(private studiegebiedService: StudiegebiedService) {
    this.studiegebiedService.getAllStudieGebieds().subscribe(data => {
      this.studiegebieden = data;
      this.opvullenArray();
    }); // inladen alle studiegebieden uit db
  }

  ngOnInit() {}


  handleSelected(){
    this.tags = [];
    this.selectedOpleiding.forEach(element => {
      this.studiegebieden.forEach(s => {
        if(s.studiegebied1 === element){
          var obj = new Studiegebied(s.id, s.studiegebied1, s.kleur, []);
          obj.opleiding = [];
          this.tags.push(obj);
        }else{
          s.opleiding.forEach(o => {
            if(o.naamOpleiding === element){
              if(this.tags.filter(e => e.id === s.id).length > 0){
                //add opleiding to already existing studiegebied object
                var index = this.tags.indexOf(this.tags.find(e => e.id === s.id));
                this.tags[index].opleiding.push(o);
              }else{
                //add studiegebied with opleiding to tags
                var obj = new Studiegebied(s.id, s.studiegebied1, s.kleur, [o]);
                
              this.tags.push(obj);
              }
            }
            
          });
        }
      })
    });
    console.log("emitting");
    this.handleStudiegebieden.emit(this.tags);
  }

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
