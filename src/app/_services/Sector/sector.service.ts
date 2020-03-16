import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  GetAll(){
    return this.http.get<any>(`${this.apiUrl}sector`);
  }

}
