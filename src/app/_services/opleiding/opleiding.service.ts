import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, from, Observable } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { Opleiding } from '@/_models/Opleiding';


@Injectable({
  providedIn: 'root'
})
export class OpleidingService {

  apiUrl: string = 'https://youngpotentials.azurewebsites.net/'
  opleidings : Opleiding[];

  constructor(private http: HttpClient) { }

  /*getAll(): Observable<any[]>
  {
    return this.http.get<Opleiding[]>(`${this.apiUrl}/opleiding`).pipe(
      tap(result => this.opleidings = result)
    );
  }
  */


}
