import { Injectable } from '@angular/core';
import { StudieGebied } from '../Model/StudieGebied'
import { STUDIEGEBIEDS } from '../Model/StudieGebieds'
import { Observable, of } from 'rxjs';
import * as data from '../../app/vives.json'
import { HttpClient, HttpResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class StudieService {

  configUrl = 'D:\angular\YoungPotentialsAngular\src\app\vives.json';

  constructor(private http: HttpClient) { }

  getData(): Observable<StudieGebied[]>{
    return of(STUDIEGEBIEDS);
  }
  

  getConfigResponse() : Observable<HttpResponse<StudieGebied>> {
    return this.http.get<StudieGebied>(
      this.configUrl, { observe: 'response'}
    );
  }
}
