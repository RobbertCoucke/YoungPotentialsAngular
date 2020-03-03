import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, from, Observable } from 'rxjs';
import { catchError, retry, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AfstueerrichtingService {
  apiUrl: string = 'https://youngpotentials.azurewebsites.net/'

  constructor(private htto: HttpClient) { }
}
