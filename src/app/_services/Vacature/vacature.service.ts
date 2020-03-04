import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Vacature} from '../../_models/vacature';

@Injectable({
  providedIn: 'root'
})
export class VacatureService {

  constructor(private http: HttpClient) { }

  getAllVacatures() {
    return this.http.get<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/offer/getAll`);
  }

  getAllVacaturesByCompany(companyId: number) {
    return this.http.get<any>(`http://youngpotentials.azurewebsites.net/offer/${companyId}`);
  }

  createVacature(vacature: Vacature) {
    return this.http.post<any>(`http://youngpotentials.azurewebsites.net/offer`, vacature);
  }

  updateOffer(vacature: Vacature){
    return this.http.put<any>(`http://youngpotentials.azurewebsites.net/offer/${vacature.id}`, vacature);
  }

  filterVacatures(filters: Object){
    console.log(filters);
    return this.http.post<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/offer/filter`,{ids: filters});

  }

  deleteVacature(vacatureId: number){
    return this.http.delete<any>(`http://youngpotentials.azurewebsites.net/offer/${vacatureId}`);
  }

}
