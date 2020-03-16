import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getAllUnverifiedCompanies() {
    return this.http.get<any[]>(`${this.apiUrl}company/unverified`);
  }

  getAllVerifiedCompanies(){
    return this.http.get<any[]>(`${this.apiUrl}company/verified`);
  }

  verifyCompany(companyId: number) {
    return this.http.get<any>(`${this.apiUrl}company/verify/${companyId}`);
  }

  deleteFavorite(companyId: number){
    return this.http.get<any>(`${this.apiUrl}company/unverify/${companyId}`);
  }

  unverifyCompany(companyId: number) {
    return this.http.get<any>(`${this.apiUrl}company/unverify/${companyId}`);
  }
}
