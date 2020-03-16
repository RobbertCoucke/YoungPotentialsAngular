import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class PagingService {
  setFirstPageFunction  = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  setFirstPage(number:number) {
    console.log("First page")
    this.setFirstPageFunction.emit(number);
  }
}
