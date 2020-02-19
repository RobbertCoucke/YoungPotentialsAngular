import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { catchError, retry, map } from 'rxjs/operators';
import { StudieGebied } from '@/Model/StudieGebied';

@Injectable({
  providedIn: 'root'
})
export class StudiegebiedService {
  apiUrl: string = 'https://youngpotentials.azurewebsites.net/'

  constructor(private http: HttpClient) { }

  public getAllStudieGebieds(){
    return this.http.get<StudieGebied[]>(`${this.apiUrl}/studiegebied`).pipe();
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
