import { UserService } from '@/_services';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { TranslateCacheService } from 'ngx-translate-cache';

//login logout
import { AuthenticationService } from './../_services/Authentication/authentication.service';
import { User, Role } from './../_models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  host: { "class": "c" },
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  // voor login / logout procedure
  currentUser: User;
  // StudentName
  name: string;

  // Dropdown
  // navbar mobile
  navbarOpen = false;
  // Dropdown voor taalMenu
  taalMenuOpen = false;

  // Talen arrays
  // Array met alle beschikbare talen
  languages = ["nl", "en"];
  // Array met de talen die zich in de dropdown bevinden en dus niet geselecteerd zijn.
  dropdownLanguages = ["en"];
  // De geselecteerde taal
  selectedLanguage = "nl";

  /**
   * @description ...
   */
  get isAdmin() {
    return this.currentUser && this.currentUser.role === Role.Admin;
  }

  constructor(private translate: TranslateService,
    translateCacheService: TranslateCacheService,
    // login logout
    private router: Router,
    private authenticationService: AuthenticationService, private userService: UserService) {

    // Zet de standaard taal op Nederlands
    translate.setDefaultLang('nl');
    translateCacheService.init();

    // login logout
    this.authenticationService.currentUser.subscribe(x => {

      this.currentUser = x;
      if (this.currentUser != null) {
        // Een subscribe om de data binnen te halen van de gebruiker.
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
    this.getCookieIfItExists();
  }

  /**
   * @description Controleert indien language cookie bestaat,
   *              daarna zet hij de huidige taal op de taal die zich
   *              in de cookie bevindt en roept hij de methode changeLanguage aan.
   */
  getCookieIfItExists() {
    if (this.getCookie("language") !== undefined) {
      this.selectedLanguage = this.getCookie("language");
      this.changeLanguage(this.selectedLanguage);
    }
  }

  getCookieCheck(){
    return this.getCookie("language");
  }

  /**
   * @description Uitloggen van een user
   */
  logout() {
    this.authenticationService.logout();
  }

  /**
   * @description Openen van het taalmenu
   */
  toggleTaalMenuOpen() {
    this.taalMenuOpen = true;
    /*
      Returning false from an event handler will automatically call event.stopPropagation() and event.preventDefault()
      Het voordeel hiervan is dat de hyperlink niet opnieuw naar boven scrollt van de pagina
    */
    return false;
  }

  /**
   * @description Sluiten van het taalmenu
   */
  toggleTaalMenuClose() {
    this.taalMenuOpen = false;
    /*
      Returning false from an event handler will automatically call event.stopPropagation() and event.preventDefault()
      Het voordeel hiervan is dat de hyperlink niet opnieuw naar boven scrollt van de pagina
    */
    return false;
  }

  /**
   * @description Openen en sluiten van het taalmenu (toggle)
   */
  toggleTaalMenuOpenClose($e) {
    this.taalMenuOpen = !this.taalMenuOpen;
    /*
      Returning false from an event handler will automatically call event.stopPropagation() and event.preventDefault()
      Het voordeel hiervan is dat de hyperlink niet opnieuw naar boven scrollt van de pagina
    */
    return false;
  }

  /**
   * @description Verandert alle tekst naar de gekozen taal en roept de methode changeLanguage op
   * @param language De taal waar naar vertaalt wordt
   */
  useLanguage(language: string) {
    this.translate.use(language);
    this.changeLanguage(language);
  }

  /**
   * @description Verandert de taal die in de @param selectedLanguage zit en
   *              verandert de talen die zich in de dropdown bevinden van de talen.
   * @param language De taal die moet veranderd worden
   */
  changeLanguage(language: string) {
    this.selectedLanguage = language;
    this.dropdownLanguages = this.languages.filter(e => e !== this.selectedLanguage);
  }
  
  /**
   * @description Cookie opvragen
   * @param name naam van de cookie
   */
  getCookie(name: string) {
    const value = "; " + document.cookie;
    const parts = value.split("; " + name + "=");

    if (parts.length == 2) {
      return parts.pop().split(";").shift();
    }
  }
}

