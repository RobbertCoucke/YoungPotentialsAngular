import { Component, OnInit } from '@angular/core';
import { User, Role, Type, Company } from '@/_models';
import { AuthenticationService } from '@/_services';
import { Router } from '@angular/router';
import { VacatureService } from '@/_services/Vacature/vacature.service';
import { CompanyService } from '@/_services/Company/company.service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.scss']
})
export class VerifyComponent implements OnInit {

  currentUser : User;
  companies: Company[];


  constructor(private authenticationService: AuthenticationService,
    private companyService: CompanyService,
        private router: Router) {

    this.authenticationService.currentUser.subscribe(u => {
      this.currentUser = u;
      if(this.currentUser.role !== Role.Admin){
        this.router.navigate(['/']);
      }
    });

    this.companyService.getAllUnverifiedCompanies().subscribe(c => this.companies = c);
   }


   verifyCompany(companyId){
      this.companyService.verifyCompany(companyId).subscribe();
   }

   unverifyCompany(companyId){
      this.companyService.verifyCompany(companyId).subscribe();
   }

  ngOnInit() {
  }

}
