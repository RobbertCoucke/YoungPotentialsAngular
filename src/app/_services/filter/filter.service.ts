import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  invokeFilterComponent = new EventEmitter();
  subsVar: Subscription;
    
  constructor() { }
    
  /**
   * @description Klikt een overeenkomstige checkbox aan bij de filtercomponent wanneer er wordt geklikt op de knoppen van de homecomponent
   */
  setCheckbox(name: string) {
    this.invokeFilterComponent.emit(name);
  }

}
