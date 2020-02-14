import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vacture-filter',
  templateUrl: './vacture-filter.component.html',
  styleUrls: ['./vacture-filter.component.scss']
})
export class VactureFilterComponent implements OnInit {

  selectedGebied: string = '';

  selectedgebieds = [];


  studiegebied: any= [
    "HWB",
    "Biotechniek",
    "Sociaal"
  ]

  dictionary = {
    "HWB" : ["Toegepaste Informatica", "Marketing"],
    "Biotechniek" : ["Ibrahem","Wannees"],
    "Sociaal":["Robbert", "Nicolas"]
  };

  constructor() { }

  ngOnInit() {
  }

  checkgebied(gebied) : boolean {
    return gebied == "HWB"
  }



  d = {}; 
  
  onSelect(gebied) : void{
    const key = gebied;
    if(this.d[gebied] == null )
    {
      this.d[key] = this.dictionary[gebied];
    }else{

      this.d[key] = null;
    }
    console.log(this.d)

  }

  checkboxHandler (event: any) {
    this.selectedGebied = event.target.value;
    var checked = event.target.checked;
    var object = this.selectedgebieds.indexOf(this.selectedGebied)
    if(checked)
    {
     if(object == -1)
        {
            this.selectedgebieds.push(this.selectedGebied);
            console.log(this.selectedgebieds)
        }
    }
    else{
        console.log(this.selectedgebieds[object])
        this.selectedgebieds = this.selectedgebieds.filter(item => item !== this.selectedGebied)
        console.log(this.selectedgebieds)
      }
    }

}
