import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  //TODO change any to model!!

  getAllUnverifiedCompanies() {
    return this.http.get<any[]>(`http://youngpotentials.azurewebsites.net/admin/getUnverified`);
  }

  addFavorite(companyId: number) {
    return this.http.put<any>(`http://youngpotentials.azurewebsites.net/admin`, companyId);
  }

}
