import { Injectable, EventEmitter } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';

@Injectable({
  providedIn: 'root'
})
export class PagingService {
  setFirstPageFunction  = new EventEmitter();
  subsVar: Subscription;

  constructor() { }

  /**
   * @description Wanneer er gesorteerd wordt moet de pagina terug op pagina 1 gezet worden
   * @param number De pagina waar naar moet genavigeerd worden
   */
  setFirstPage(number:number) {
    this.setFirstPageFunction.emit(number);
  }
}
