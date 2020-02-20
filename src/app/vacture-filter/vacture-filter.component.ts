import { Component, OnInit } from '@angular/core';
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

  selectedGebied: string;
  //array for all Studiegebied objects
  studiegebieds: Studiegebied[] = [];
  //array for all opleiding objects
  opleidingsArray : Opleiding[] = [];
  //array for all Afstudeerrichting object
  afstudeerrichtinsgArray : Afstudeerrichting[] = [];
  //array for all keuze object
  keuzesArray : Keuze[] = [];

  selectedgebieds = [];


  

  constructor(private studieService: StudiegebiedService) { }

  ngOnInit() {
    this.showData();
    console.log(this.keuzesArray);
  }

  checkgebied(gebied) : boolean {
    return gebied == "HWB"
  }



  s = {}; 
  o = {};
  k = {};

  
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


  onSelectOpleiding(id){
    const key = id;
    var selectedOpleiding = this.opleidingsArray.filter(op => op.id == id);
    var afstudeerrichtings = selectedOpleiding[0].afstudeerrichtings;
    if(this.o[key] == null)
    {
      this.o[key] = afstudeerrichtings;
    }else{
      this.o[key] = null;
    }

  }

  onSelectAfstudeerrichting(id)
  {
    const key = id;
    var selectedAfstudeerrichting = this.afstudeerrichtinsgArray.filter(k => k.id == id);
    var keuzes = selectedAfstudeerrichting[0].keuzes;
    if(this.k[key] == null)
    {
      this.k[key] = keuzes;
    }else{
      this.k[key] = null;
    }

  }



  checkboxHandler (event: any) {
    //get the selected value
    var selectedId = event.target.value;
    //get the selected Studiegebied object from the array
    var selectedStudiegebied  = this.studiegebieds.filter(item => item.id == selectedId);
    //get the opleidings of the object
    var opleidings = selectedStudiegebied[0].opleidings;
    //get of the item checked or not
    var checked = event.target.checked;
    /*
    hier controleer ik of de object in de array bestaat of niet als het bestaat dan krijg ik de index of de object anders krijg ik -1
    als het -1 voeg ik alle opleidings van geselecteerde studiegebied aan een dictionary om tonnen aan scherm,
    anderes weet ik dat het object geselecteerd was en verwijder het van de dictionary.
    */
    var object = this.selectedgebieds.indexOf(selectedStudiegebied[0])
    if(checked)
    {
     if(object == -1)
        {
            this.selectedgebieds.push(selectedStudiegebied[0]);
            this.s[selectedStudiegebied[0].id] = opleidings ;
        }
    }
    else{
        this.selectedgebieds = this.selectedgebieds.filter(item => item !== selectedStudiegebied[0]);
        this.s[selectedStudiegebied[0].id] = null;
      }
    } 


    //get Observable data from server
    showData(){
      this.studieService.getAllStudieGebieds().subscribe((res) => {
        this.studiegebieds = this.mapJSONToModel(res);
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

           if(afstudeerrichtingsArray.length != 0)
           {
                afstudeerrichtingsArray.forEach((a) => {
                var keuzeArray = a.keuze;
                var keuzes : Keuze[] = [];
                if(keuzeArray.length != 0)
                {
                  keuzeArray.forEach((k) => {
                    var keuzeModel = new Keuze(k.id, k.keuze1);
                    keuzes.push(keuzeModel);
                    this.keuzesArray.push(keuzeModel);
                  })
                  
                }
                
                var afModel = new Afstudeerrichting(a.id,a.afstudeerrichtingNaam, keuzes);
                afstudeerrichtings.push(afModel);
                this.afstudeerrichtinsgArray.push(afModel);

             })

           }             
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
