import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  SimpleChanges
} from "@angular/core";
import { StudiegebiedService } from "../_services/studiegebied/studiegebied.service";
import { Studiegebied } from "@/_models/studiegebied";
import { VacatureService } from '@/_services/Vacature/vacature.service';
import { Type } from '../_models/type';
import { FilterService } from './../_services/filter/filter.service';

@Component({
  selector: "app-vacture-filter",
  templateUrl: "./vacture-filter.component.html",
  styleUrls: ["./vacture-filter.component.scss"]
})
export class VactureFilterComponent implements OnInit {
  @Output() filterEvent: EventEmitter<Object> = new EventEmitter<Object>();
  @Input() height: number;

  // Array for all Studiegebied objects
  studiegebieds: Studiegebied[] = [];

  // Array for all opleiding objects
  opleidingArray: any[] = [];

  // Array for all types
  types: Type[] = [];

  // Selected types
  selectedTypes: Type[] = [];

  // Selected studiegebieden
  selectedgebieds = [];
  //
  contentHeight: number;

  constructor(private studieService: StudiegebiedService, private vacatureService: VacatureService, private filterService: FilterService) {
    this.showData();
  }

  ngOnInit() {

    this.checkLocalStorage(this.types, this.studiegebieds);
    /**
     * Een service zodat de functie checkvacature kan doorgegeven worden naar de homecomponent bij de knoppen vacatures,
     * stage en vakantiejob
     */
    if (this.filterService.subsVar == undefined) {
      this.filterService.subsVar = this.filterService.invokeFilterComponent.subscribe((name: string) => {
        console.log(name)
        this.checkVacature(name);
      });
    }
  }

  /**
   * TODO: Deze methode werkt nog niet volledig waardoor de code werd gecomment. De height wordt nu fixed op 2500 px gezet.
   * @description controleert indien de content van alle vacatures kleiner is dan 715, 
   * indien true dan wordt de Height van het filterComponent op 715 px gezet. Indien false dan wordt de hoogte van het vacatures component
   * de hoogte van het filter component
   * @param height De hoogte van alle vacatures
   */
  checkHeight(height: number) {
    let minHeight: number = 715;
    // if (height < minHeight) {
    //   this.contentHeight = minHeight;
    // }
    // else
    // {
    //   this.contentHeight = height;
    // }
    this.contentHeight = 2500;
  }

  /**
   * @description Methode indien er iets wijzigt
   * @param changes Wijziging
   */
  ngOnChanges(changes: SimpleChanges) {
    if (changes['height']) {
      // Do your logic here
      this.checkHeight(this.height);
    }
  }

  /**
   * @description Controleert indien @param types en @param studiegebieden leeg is,
   * indien niet dan worden de filter ingealden aan de hand van de waarden uit de LocalStorage.
   * @param types Type object
   * @param studiegbieden Studiegebied object
   */
  checkLocalStorage(types, studiegbieden) {
    const localTypes = JSON.parse(localStorage.getItem('types'));
    const localStudiegebieden = JSON.parse(localStorage.getItem('studiegebied'));

    if (localTypes != undefined) {
      localTypes.forEach(element => {
        types.push(element)
      });
    }
    if (localStudiegebieden != undefined) {
      localStudiegebieden.forEach(element => {
        studiegbieden.push(element)
      });
    }
  }

  //handles a check event of the filter
  check(event) {
    // get the selected value
    var selectedVal = event.target.value;
    var selected = event.target;

    //checks to see if value is a type or a tag
    if (selected.name === 'typeVives') {
      var selectedType;
      //gets object of selected type
      this.types.forEach(t => {
        if (t.id.toString() === selectedVal.toString()) {
          selectedType = t;
        }
      });

      //if checkbox checked -> add type to selected types, else remove type from selected types 
      if (event.target.checked) {
        this.selectedTypes.push(selectedType);
      } else {
        this.selectedTypes = this.selectedTypes.filter(t => t.id.toString() !== selectedVal.toString());
      }
    } else {
      // check if checkbox is checked to add or unchecked to delete
      if (event.target.checked) {
        let selectedObject = this.findStudiegebied(selectedVal);
        if (selectedObject === undefined) {
          selectedObject = this.findOpleiding(selectedVal);

          // check if studiegebied is already in selected
          let updateObject = this.selectedgebieds.find(
            s => s.id === selectedObject.id
          );

          if (updateObject != undefined) {
            let index = this.selectedgebieds.indexOf(updateObject);

            updateObject.opleiding.push(selectedObject.opleiding[0]);
            this.selectedgebieds[index] = updateObject;
          } else {
            this.selectedgebieds.push(selectedObject);
            // console.log(this.studiegebieds);
          }
        } else {
          let gebied = new Studiegebied(selectedObject.id, selectedObject.naam, selectedObject.kleur, []);  // nodig want anders zet hij de opleidingen in studiegebied op lege array (onbekende reden) en kan er dus ook niet meer op gefilterd worden
          this.selectedgebieds.push(gebied);
        }
      } else {
        var length = this.selectedgebieds.length;
        this.selectedgebieds = this.selectedgebieds.filter(
          s => s.id != selectedVal
        );
        if (length === this.selectedgebieds.length) {
          var studiegebied = this.findOpleiding(selectedVal);
          let updateObject = this.selectedgebieds.find(
            s => s.id === studiegebied.id
          );

          let index = this.selectedgebieds.indexOf(updateObject);
          if (this.selectedgebieds[index].opleiding.length === 1) {
            this.selectedgebieds = this.selectedgebieds.filter(
              s => s.id != studiegebied.id
            );
          } else {
            var gebied = this.selectedgebieds[index];
            var newStudiegebied = new Studiegebied(
              gebied.id,
              gebied.naam,
              gebied.kleur,
              this.selectedgebieds[index].opleiding.filter(
                o => o.id != selectedVal
              )
            );
            this.selectedgebieds[index] = newStudiegebied;
          }
        }
      }
    }

    //callback to vacaturesComponent with selected filters and types
    if (this.selectedgebieds.length < 1 && this.selectedTypes.length < 1) {

      this.filterEvent.emit({ filter: null, types: null });
    } else {
      this.filterEvent.emit({ filter: this.selectedgebieds, types: this.selectedTypes });
    }
  }

  // checkgebied(gebied) : boolean {
  //   return gebied == "HWB"
  // }

  s = {};
  o = {};

  onSelectStudie(id): void {
    const key = id;
    var selectedStudiegebied = this.studiegebieds.filter(
      item => item.id == key
    );
    var opleiding = selectedStudiegebied[0].opleiding;
    if (this.s[key] == null) {
      this.s[key] = opleiding;
    } else {
      this.s[key] = null;
    }
  }

  /**
   * @description verwijdert alle filters
   */
  removeSelected() {
    this.selectedTypes = [];
    this.selectedgebieds = [];
    this.filterEvent.emit({ filter: null, types: null });
  }

  /**
   * @description zoekt het studiegebiedsObject adhv het id
   * @param studiegebiedId
   * @return studiegebiedsObject
   */
  private findStudiegebied(id) {
    return this.studiegebieds.find(s => s.id === id);
  }

  /**
   * @description zoekt het opleidingsobject met het daarbijhorende studiegebiedsobject
   * @param opleidingId
   * @return StudiegebiedObject met daarin het gezochte opleidingsObject
   */
  private findOpleiding(id) {
    for (let i = 0; i < this.studiegebieds.length; i++) {
      for (let j = 0; j < this.studiegebieds[i].opleiding.length; j++) {
        var object = this.studiegebieds[i].opleiding[j];

        if (object.id === id) {
          var result = this.studiegebieds[i];
          var test = new Studiegebied(
            result.id,
            result.naam,
            result.kleur,
            result.opleiding.filter(o => o.id === object.id)
          );
          //result.opleiding = result.opleiding.filter(o => o.id === object.id);

          return test;
        }
      }
    }
    return null;
  }
  /**
    * @description kijkt of het type id in de geselecteerde filters voorkomt
    * @param id typeId
    * @return true => element bevindt zich in gekozen filters | false => element bevindt zich niet in gekozen filters.
    */
  isSelectedType(id) {
    if (this.selectedTypes.length > 0) {
      var object = this.selectedTypes.find(t => t.id === id);
      if (object != undefined)
        return true;
      else
        return false;
    } else {
      return false;
    }
  }

  /**
   * @description kijkt  of het studiegebied id in de geselecteerde filters voorkomt
   * @param id studiegebiedId
   * @return true => element bevindt zich in gekozen filters | false => element bevindt zich niet in gekozen filters.
   */
  isSelected(id) {
    for (let i = 0; i < this.selectedgebieds.length; i++) {
      if (this.selectedgebieds[i].id === id) {
        return true;
      }

      for (let j = 0; j < this.selectedgebieds[i].opleiding.length; j++) {
        var object = this.selectedgebieds[i].opleiding[j];
        if (object.id === id) {
          return true;
        }
      }
    }
    return false;
  }

  // get Observable data from server
  showData() {
    if (localStorage.getItem('studiegebied') == undefined) {
      console.log('Get data from database studiegebied')
      this.studieService.getAllStudieGebieds().subscribe(res => {
        this.studiegebieds = this.mapJSONToModel(res);
        localStorage.setItem('studiegebied', JSON.stringify(this.studiegebieds));
      });
    }

    if (localStorage.getItem('types') == undefined) {
      console.log('Get data from database types')
      this.vacatureService.getAllTypes().subscribe(types => {
        this.types = types;
        localStorage.setItem('types', JSON.stringify(this.types));
      });
    }
  }

  // data mapping
  mapJSONToModel(res): any[] {
    var list: Studiegebied[] = [];
    res.forEach(element => {
      var opleiding: any[] = [];
      var opleidingArray = element.opleiding;
      if (opleidingArray && opleidingArray.length != 0) {
        opleidingArray.forEach(o => {
          var afstudeerrichtingsArray = o.afstudeerrichting;
          var afstudeerrichtings: any[] = [];
          var op = { id: o.id, naam: o.naamOpleiding, afstudeerrichtings: afstudeerrichtings };
          opleiding.push(op);
          this.opleidingArray.push(op);
        });
      }
      var model = new Studiegebied(
        element.id,
        element.studiegebied1,
        element.kleur,
        opleiding
      );
      list.push(model);
    });

    return list;
  }

  checkVacature(typeName: string) {
    let element = <HTMLInputElement>document.getElementById(typeName);
    element.checked = true;
    let event = new CustomEvent("build", { detail: 3 });
    element.dispatchEvent(event);
    this.check(event);
  }
}
