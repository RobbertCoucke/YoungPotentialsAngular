import { Component, NgModule, ViewChild, OnInit, Output } from "@angular/core";
import { StudiegebiedService } from "@/_services/studiegebied/studiegebied.service";
import { OpleidingStudiegebied } from "@/_models/opleidingStudiegebied";
import { EventEmitter } from '@angular/core';
import { Studiegebied } from '../_models/studiegebied';

/** 
 * *Interfaces
 * 
 */
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
export class SelectStudiegebiedenComponent {
  studiegebieden: any[] = []; // Array met studiegebied objecten
  studiegebied: Stgebied[]; //veld om een studiegebied in op te slaan
  opleiding: OPL[]; //veld om een opleiding in op te slaan

  /** 
   * Array waarin we opleiding en verwant studiegebied in op slaan
   * nodig om data weer te kunnen geven in Ngselect module die gebruikt wordt om studiegebieden weer te geven
   * Zie html bindlabel en groupBy
   */
  totaal: OpleidingStudiegebied[] = []; 


  opleidingName: string; //veld om tijdelijk de opleidingsnaam in op te slaan
  studiegebiedName: string; //veld om tijdelijk studiegebiednaam in op te slaan
  studiegebiedID: string; //veld om tijdelijk studiegebied id in op te slaan
  IDSTG: string; //veld om tijdelijk studiegebied id van opleidingsobject in array op te slaan
  tags: any[]; // houdt de geselecteerde studiegebieden/opleidingen bij

  //eventemiter om actie van parent uit te voeren in child
  @Output() handleStudiegebieden: EventEmitter<Studiegebied[]> = new EventEmitter<Studiegebied[]>();

  selectedOpleiding: string[]; // array met geselecteerde opleidingen

  constructor(private studiegebiedService: StudiegebiedService) {
    this.studiegebiedService.getAllStudieGebieds().subscribe(data => {
      this.studiegebieden = data;
      this.opvullenArray();
    }); // inladen alle studiegebieden uit db
  }

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
   * @description opvullen array met opleidingnaam en de verwante studiegebiednaam
   * Wordt gebruikt om de ngSelect op te vullen
   */
  opvullenArray() {
    this.studiegebieden.forEach(element => {
      this.studiegebiedName = element.studiegebied1;
      this.studiegebiedID = element.id;

      var arr: Stgebied[] = [
        { name: this.studiegebiedName, ID: this.studiegebiedID }
      ];
      this.studiegebied = arr;

      element.opleiding.forEach(elementa => {
        this.opleidingName = elementa.naamOpleiding;
        this.IDSTG = elementa.idStudiegebied;

        var arrOpl: OPL[] = [{ name: this.opleidingName, stgID: this.IDSTG }];
        this.opleiding = arrOpl;
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
