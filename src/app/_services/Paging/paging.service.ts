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
    this.setFirstPageFunction.emit(number);
  }
}
