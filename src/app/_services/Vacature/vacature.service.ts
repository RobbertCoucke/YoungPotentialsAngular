import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {RequestOptions, Request, Headers } from '@angular/http';
import {Vacature} from '../../_models/vacature';
import {Type} from '../../_models/type'
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VacatureService {
  requestoptions: RequestOptions;
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { 
    this.requestoptions = new RequestOptions({headers: null, withCredentials: true});
  }


  //* returns all vacatures where the expiration date isn't exceeded and the company is verified.
  getAllVacatures() {
    //options corsheader  HttpClient CORS header
        //anders checken wadaze versturen in header met die rare link me breakpoint in backend en da nadoen
    //return this.http.get<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/offer/getAll`);
    
    return this.http.get<any>(`${this.apiUrl}offer/getAll`);
  }

  //* returns all vacatures of a company
  getAllVacaturesByCompany(companyId: number) {
    return this.http.get<any>(`${this.apiUrl}offer/getAllCompany/${companyId}`);
  }

  //* creates a vacature
  createVacature(vacature: any) {
    //return this.http.post<any>(`${this.apiUrl}offer/create`, vacature);
    return this.http.post<any>(`http://localhost:60213/offer/create`, vacature);
  }

  //* updates a vacature
  updateOffer(vacature: Vacature){
    return this.http.put<any>(`${this.apiUrl}offer/${vacature.id}`, vacature);
  }

  //* returns all vacatures of: types & with tags
  filterVacatures(filters: Object, types: Type[]){
    //return this.http.post<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/offer/filter`,{types: types, ids: filters});
    
    return this.http.post<any>(`${this.apiUrl}offer/filter`,{ids: filters,types: types});

  }

  //* removes a vacature
  deleteVacature(vacatureId: number){
    return this.http.delete<any>(`${this.apiUrl}offer/${vacatureId}`);
  }

  //* returns a single vacature
  getVacatureById(vacatureId: number)
  {
    return this.http.get<any>(`${this.apiUrl}offer/${vacatureId}`);
  }

  //* returns all different types
  getAllTypes(){
    return this.http.get<any>(`${this.apiUrl}offer/types`);
    //return this.http.get<any>(`http://youngpotentials.azurewebsites.net/offer/types`);
  }

  //* sends a mail to the chosen company about the chosen offer
  soliciteer(formData: FormData){
    return this.http.post<any>(
      `${this.apiUrl}offer/apply`,
      formData
    );
  }

}
