import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, from, Observable } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';
import { Studiegebied } from 'app/_models/studiegebied';



@Injectable({
  providedIn: 'root'
})
export class StudiegebiedService {
  apiUrl: string = 'https://cors-anywhere.herokuapp.com/https://youngpotentials.azurewebsites.net/'
  localUrl: string = 'http://localhost:60213/'

  constructor(private http: HttpClient) { }

  studiegebieds: Studiegebied[];

  public getAllStudieGebieds(): Observable<any[]>{
    return this.http.get<Studiegebied[]>(`${this.localUrl}studiegebied`).pipe(
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
