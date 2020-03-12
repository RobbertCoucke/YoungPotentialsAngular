import { Injectable, EventEmitter } from '@angular/core';    
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  invokeFilterComponent = new EventEmitter();    
  subsVar: Subscription;    
    
  constructor() { }    
    
  setCheckbox(name:string) {
    console.log("filter setCheckbox")
    this.invokeFilterComponent.emit(name);    
  }

}
