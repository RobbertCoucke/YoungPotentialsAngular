import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SectorService {

  constructor(private http: HttpClient) { }

  GetAll(){
    return this.http.get<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/sector`);
  }

}
