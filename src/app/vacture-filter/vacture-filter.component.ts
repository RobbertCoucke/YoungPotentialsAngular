import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vacture-filter',
  templateUrl: './vacture-filter.component.html',
  styleUrls: ['./vacture-filter.component.scss']
})
export class VactureFilterComponent implements OnInit {

  selectedGebied: string = '';
  show : boolean = false;

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

  onSelect(gebied) : void{
    if (gebied == "HWB" && this.checkgebied(gebied))
    {
      this.show = true;
    }
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
