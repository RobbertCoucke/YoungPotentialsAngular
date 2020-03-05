import { Component, OnInit } from '@angular/core';
import { VacatureService } from '@/_services/Vacature/vacature.service';
import { User, Company, Role } from '@/_models';
import { Vacature } from '@/_models/vacature';
import { AuthenticationService, UserService } from '@/_services';
import { Favoriet } from '@/_models/favoriet';

@Component({
  selector: 'app-company-vacatures',
  templateUrl: './company-vacatures.component.html',
  styleUrls: ['./company-vacatures.component.scss']
})
export class CompanyVacaturesComponent implements OnInit {

  currentUser : User;
  company: Company;
  vacatures : Favoriet[] = [];

  constructor(private vacatureService: VacatureService, private authenticationService : AuthenticationService, private userService : UserService) {

    //get logged in user
    this.authenticationService.currentUser.subscribe(u => {
      
      //get company by user Id
      if(this.currentUser.role == Role.Company){
        this.userService.getById(this.currentUser.id).subscribe(c => {
          //this.company = c;
          //get all vacatures by companyId
          this.vacatureService.getAllVacaturesByCompany(this.company.companyId).subscribe(vacatures => {
              //transfer vacatureObject to FavoriteObject for vacature-listItem and add to vacaturesList
              vacatures.array.forEach(element => {
                this.vacatures.push(new Favoriet(null, element));
              });
          });
        });
      }
    });
   }

  ngOnInit() {
  }

}
