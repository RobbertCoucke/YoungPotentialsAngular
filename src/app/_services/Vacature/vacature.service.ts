import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Vacature} from '../../_models/vacature';
import {Type} from '../../_models/type'

@Injectable({
  providedIn: 'root'
})
export class VacatureService {

  constructor(private http: HttpClient) { }

  getAllVacatures() {
    //options corsheader  HttpClient CORS header
        //anders checken wadaze versturen in header met die rare link me breakpoint in backend en da nadoen
    //return this.http.get<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/offer/getAll`);
    
    return this.http.get<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/offer/getAll`);
  }

  getAllVacaturesByCompany(companyId: number) {
    return this.http.get<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/offer/getAllCompany/${companyId}`);
  }

  createVacature(vacature: any) {
    return this.http.post<any>(`http://localhost:60213/offer/create`, vacature);
  }

  createTest(){
    return this.http.get<any>( `https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/offer/create/test`);
  }

  updateOffer(vacature: Vacature){
    return this.http.put<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/offer/${vacature.id}`, vacature);
  }

  filterVacatures(filters: Object, types: Type[]){
    return this.http.post<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/offer/filter`,{types: types, ids: filters});
    
    //return this.http.post<any>(`http://localhost:60213/offer/filter`,{ids: filters,types: types});

  }

  deleteVacature(vacatureId: number){
    return this.http.delete<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/offer/${vacatureId}`);
  }

  getVacatureById(vacatureId: number)
  {
    return this.http.get<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/offer/${vacatureId}`);
  }

  getAllTypes(){
    return this.http.get<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/offer/types`);
  }

}
