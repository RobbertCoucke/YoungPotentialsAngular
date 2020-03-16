import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  constructor(private http: HttpClient) { }

  getAllUnverifiedCompanies() {
    return this.http.get<any[]>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/company/unverified`);
  }

  getAllVerifiedCompanies(){
    return this.http.get<any[]>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/company/verified`);
  }

  verifyCompany(companyId: number) {
    return this.http.get<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/company/verify/${companyId}`);
  }

  deleteFavorite(companyId: number){
    return this.http.get<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/company/unverify/${companyId}`);
  }

  unverifyCompany(companyId: number) {
    return this.http.get<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/company/unverify/${companyId}`);
  }
}
