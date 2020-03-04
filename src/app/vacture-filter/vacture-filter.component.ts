import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { StudiegebiedService } from '../_services/studiegebied/studiegebied.service'
import { Studiegebied } from '@/_models/studiegebied';
import { Opleiding } from '@/_models/Opleiding';
import { Afstudeerrichting } from '@/_models/afstudeerrichting';
import { Keuze } from '@/_models/Keuze';


@Component({
  selector: 'app-vacture-filter',
  templateUrl: './vacture-filter.component.html',
  styleUrls: ['./vacture-filter.component.scss']
})
export class VactureFilterComponent implements OnInit {

  
  @Output() filterEvent: EventEmitter<Studiegebied[]> = new EventEmitter<Studiegebied[]>();

  //selectedGebied: string;
  //array for all Studiegebied objects
  studiegebieds: Studiegebied[] = [];
  //array for all opleiding objects
  opleidingsArray : Opleiding[] = [];
  testgebieds: Studiegebied[] = [];

  selectedgebieds = [];


  

  constructor(private studieService: StudiegebiedService) { 
    this.showData();
  }

  ngOnInit() {
    
  }



  
  check (event) {
    console.log(this.studiegebieds);
    //get the selected value
    var selectedVal = event.target.value;
    //console.log(selectedVal);

    //check if checkbox is checked to add or unchecked to delete
    if(event.target.checked){

      var selectedObject = this.findStudiegebied(selectedVal);
       if(selectedObject === undefined){
 
         selectedObject = this.findOpleiding(selectedVal);
    
        

         //check if studiegebied is already in selected
         let updateObject = this.selectedgebieds.find(s => s.id === selectedObject.id);

         if(updateObject != undefined){    
         let index = this.selectedgebieds.indexOf(updateObject);

         updateObject.opleidings.push(selectedObject.opleidings[0]);
         this.selectedgebieds[index] = updateObject;
 
         }else{
           this.selectedgebieds.push(selectedObject);
           //console.log(this.studiegebieds);
         }
        
       }else{
         this.selectedgebieds.push(selectedObject);
         

       }

      
      

    }
    else{

      
      var length = this.selectedgebieds.length;
      this.selectedgebieds = this.selectedgebieds.filter(s => s.id != selectedVal);
      if(length === this.selectedgebieds.length){
         var studiegebied =this.findOpleiding(selectedVal);
         let updateObject = this.selectedgebieds.find(s => s.id === studiegebied.id);
        
         let index = this.selectedgebieds.indexOf(updateObject);
        if(this.selectedgebieds[index].opleidings.length === 1){
           this.selectedgebieds = this.selectedgebieds.filter(s => s.id != studiegebied.id);
         }else{

          var gebied = this.selectedgebieds[index];
          var newStudiegebied = new Studiegebied(gebied.id, gebied.naam, gebied.kleur, this.selectedgebieds[index].opleidings.filter(o => o.id != selectedVal));
           this.selectedgebieds[index] = newStudiegebied;
         }

      }
      
      

    }


    if(this.selectedgebieds === []){
      console.log("empty")
    }
    this.filterEvent.emit(this.selectedgebieds);
    


  }

  // checkgebied(gebied) : boolean {
  //   return gebied == "HWB"
  // }



  s = {}; 
  o = {};

  
   onSelectStudie(id) : void{
    const key = id;
    var selectedStudiegebied  = this.studiegebieds.filter(item => item.id == key);
    var opleidings = selectedStudiegebied[0].opleidings;
    if(this.s[key] == null )
    {
      this.s[key] = opleidings
    }else{

      this.s[key] = null;
    }


    

  } 

  removeSelected(){
    this.selectedgebieds = [];
  }

  private findStudiegebied(id){
      return this.studiegebieds.find(s => s.id === id);

    }

    private findOpleiding(id){
      for(let i=0; i<this.studiegebieds.length; i++){

        for(let j=0; j<this.studiegebieds[i].opleidings.length; j++){
        var object = this.studiegebieds[i].opleidings[j];

          if(object.id === id){
            var result = this.studiegebieds[i];
            var test = new Studiegebied(result.id, result.naam, result.kleur, result.opleidings.filter(o => o.id === object.id));
            //result.opleidings = result.opleidings.filter(o => o.id === object.id);

            return test;
          }
        }
      }
      return null;
      
    }

    isSelected(id){
      for(let i=0; i<this.selectedgebieds.length; i++){
        if(this.selectedgebieds[i].id===id){
          return true;
        }

        for(let j=0; j<this.selectedgebieds[i].opleidings.length; j++){
          var object = this.selectedgebieds[i].opleidings[j];
          if(object.id === id){


            return true;
          }
        }
      }
      return false;
      
    }




    //get Observable data from server
    showData(){
      this.studieService.getAllStudieGebieds().subscribe((res) => {
        this.studiegebieds = this.mapJSONToModel(res);
        this.testgebieds = this.mapJSONToModel(res);
      })
    }

    //data mapping
    mapJSONToModel(res) : any[] {
      var list : Studiegebied[] = [];
      res.forEach(element => {
        var opleidings: Opleiding[] = [];
        var opleidingsArray = element.opleiding;
        if(opleidingsArray.length != 0)
        {
           opleidingsArray.forEach((o) => {
           var afstudeerrichtingsArray = o.afstudeerrichting;
           var afstudeerrichtings : Afstudeerrichting[] = [];            
           var op = new Opleiding(o.id, o.naamOpleiding, afstudeerrichtings);
           opleidings.push(op);
           this.opleidingsArray.push(op);
           });

        } 
        var model = new Studiegebied(element.id, element.studiegebied1, element.kleur, opleidings);
        list.push(model);
      });

      return list;
    }


  }


  //alle opleidingen aangevinkd -> studiegebied ook aangevinkt
  //studiegebied aangevinkt ook alle opleidingen aanvinken
  //opleiding aangevinkt ook studiegebied aanvinken???