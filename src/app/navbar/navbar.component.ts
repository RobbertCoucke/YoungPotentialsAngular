import { UserService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { TranslateCacheService } from 'ngx-translate-cache';

//login logout
import { AuthenticationService } from './../_services/Authentication/authentication.service';
import { User, Role } from './../_models';
import { Router } from '@angular/router';
//

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  host: { "class": "c" },
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // voor login / logout procedure
  currentUser: User;
  //StudentName
  name: string;

  //navbar mobile
  navbarOpen = false;
  //Dropdown voor taalMenu
  taalMenuOpen = false;

  languages = ["nl", "en"];
  dropdownLanguages = ["en"];
  selectedLanguage = "nl";

  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  constructor(private translate: TranslateService,
    translateCacheService: TranslateCacheService,
    // login logout
    private router: Router,
    private authenticationService: AuthenticationService, private userService: UserService)
  // 
  {
    translate.setDefaultLang('nl');
    translateCacheService.init();

    // login logout
    this.authenticationService.currentUser.subscribe(x => {
      
        this.currentUser = x;
        if (this.currentUser != null) {
        //Een subscribe om de data binnen te halen van de gebruiker.
        this.userService.getById(this.currentUser.id).subscribe(data => {
          switch (this.currentUser.role) {
            case "User": {
              this.name = data.firstName + " " + data.name;
              break;
            }
            case "Company": {
              this.name = data.companyName;
              break;
            }
            case "Admin": {
              this.name = "Administrator";
              break;
            }
          }

        });
      }


    });
  }



  ngOnInit() {
    if (getCookie("language") !== undefined) {
      this.selectedLanguage = getCookie("language");
      this.changeLanguage(this.selectedLanguage);
    }
  }

  logout() {
    this.authenticationService.logout();
    //this.router.navigate(['/login']);
  }

  toggleTaalMenuOpen() {
    this.taalMenuOpen = true;
    return false;
  }
  toggleTaalMenuClose() {
    this.taalMenuOpen = false;
    return false;
  }
  toggleTaalMenuOpenClose($e) {
    this.taalMenuOpen = !this.taalMenuOpen;
    /* 
      Returning false from an event handler will automatically call event.stopPropagation() and event.preventDefault()
      Het voordeel hiervan is dat de hyperlink niet opnieuw naar boven scrollt van de pagina
    */
    return false;
  }

  useLanguage(language: string) {
    this.translate.use(language);
    this.changeLanguage(language);
  }

  changeLanguage(language: string) {
    this.selectedLanguage = language;
    this.dropdownLanguages = this.languages.filter(e => e !== this.selectedLanguage);
  }
}

//Functie om een cookie op te vragen.
export function getCookie(name: string) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");

  if (parts.length == 2) {
    return parts.pop().split(";").shift();
  }

}

