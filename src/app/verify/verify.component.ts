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
  loading: boolean = true;
  error: boolean = false;


  constructor(private authenticationService: AuthenticationService,
    private companyService: CompanyService,
        private router: Router) {

    this.authenticationService.currentUser.subscribe(u => {
      this.currentUser = u;
       if(this.currentUser && this.currentUser.role !== Role.Admin){
        this.router.navigate(['/']);
      }
    });

    this.companyService.getAllUnverifiedCompanies().subscribe(c => {
      
      this.companies = c;
      this.loader(this.companies);
    });
   }

   loader(x)
   {
      //Loading
      if(x.length !== 0)
      {
        this.loading = false;
      }
      else
      {
        this.loading = false;
        this.error = true;
      }
   }
   

  ngOnInit() {
  }

  removeEvent(company: Company){

    setTimeout( () => this.companies = this.companies.filter(o => o !== company), 1000);
  }

}
