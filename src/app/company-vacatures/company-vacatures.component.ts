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
    
   }

  ngOnInit() {
    console.log("in component");
    //get logged in user
    this.authenticationService.currentUser.subscribe(u => {
      console.log("in user");
      //get company by user Id
      this.currentUser = u;
      if(this.currentUser && this.currentUser.role == Role.Company){
        console.log("in if");
        this.userService.getById(this.currentUser.id).subscribe(c => {
          this.company = c;
          //get all vacatures by companyId
          console.log(this.company);
          this.vacatureService.getAllVacaturesByCompany(this.company.id).subscribe(vacatures => {
            console.log(vacatures);
              //transfer vacatureObject to FavoriteObject for vacature-listItem and add to vacaturesList
              vacatures.forEach(element => {
                this.vacatures.push(new Favoriet(null, new Vacature(element)));
              });
          });
        });
      }
    });
  }

  
  removeEvent(favorite: Favoriet){

    setTimeout( () => this.vacatures = this.vacatures.filter(o => o !== favorite), 1000);
  }

}
