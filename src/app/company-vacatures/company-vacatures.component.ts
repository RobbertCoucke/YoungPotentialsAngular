import { Component, OnInit } from '@angular/core';
import { VacatureService } from '@/_services/Vacature/vacature.service';
import { User, Company, Role } from '@/_models';
import { Vacature } from '@/_models/vacature';
import { AuthenticationService, UserService } from '@/_services';
import { Favoriet } from '@/_models/favoriet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-company-vacatures',
  templateUrl: './company-vacatures.component.html',
  styleUrls: ['./company-vacatures.component.scss']
})
export class CompanyVacaturesComponent implements OnInit {

  currentUser : User;
  company: Company;
  vacatures : Favoriet[] = [];
  /*
   * Veld die bijhoudt indien de loading image moet worden getoond, hij start op true zodat wanneer de pagina inlaadt
   * de load image wordt getoond totdat alle vacatures zijn ingeladen.
  */
  loading: boolean = true;
  error: boolean = false;

  constructor(private vacatureService: VacatureService, private authenticationService : AuthenticationService, private userService : UserService, private router: Router) {
    
   }

  ngOnInit() {
    this.fillVacatures();
  }

  /**
   * @description gets company and all vacatures of said company and transfers them to a favoriteObject because vacatureListItem expects a favoriteObject
   */
  fillVacatures(){
    console.log("in component");
    //get logged in user
    this.authenticationService.currentUser.subscribe(u => {
      //get company by user Id
      this.currentUser = u;
      if(this.currentUser && this.currentUser.role == Role.Company){
        this.userService.getById(this.currentUser.id).subscribe(c => {
          this.company = c;
          //get all vacatures by companyId
          this.vacatureService.getAllVacaturesByCompany(this.company.id).subscribe(vacatures => {
              //transfer vacatureObject to FavoriteObject for vacature-listItem and add to vacaturesList
              vacatures.forEach(element => {
                this.vacatures.push(new Favoriet(null, new Vacature(element)));
              });
              if(this.vacatures.length != 0)
              {
                this.loading = false;
              }
              else
              {
                this.loading=false;
                this.error=true;
              }
          });
        });
      }else{
        this.router.navigate(["/"]);
      }
    });
  }

  
  removeEvent(favorite: Favoriet){

    setTimeout( () => this.vacatures = this.vacatures.filter(o => o !== favorite), 1000);
  }

}
