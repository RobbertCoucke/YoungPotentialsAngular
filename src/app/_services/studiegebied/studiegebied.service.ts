import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, from, Observable } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { Studiegebied } from 'app/_models/studiegebied';
import {environment} from '../../../environments/environment';



@Injectable({
  providedIn: 'root'
})
export class StudiegebiedService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  studiegebieds: Studiegebied[];

  public getAllStudieGebieds(): Observable<any[]>{
    return this.http.get<Studiegebied[]>(`${this.apiUrl}studiegebied`).pipe(
      tap(result => this.studiegebieds = result)
    );
  }

  handleError(error: HttpErrorResponse)
  {
      let errorMessage = 'Unknown error!';
      if (error.error instanceof ErrorEvent) {
        // Client-side errors
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side errors
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        return throwError(errorMessage);
      }
  }
}
