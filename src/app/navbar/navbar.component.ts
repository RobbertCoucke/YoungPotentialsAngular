import { Component, OnInit } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

import { TranslateCacheService } from 'ngx-translate-cache';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  host: { "class": "c"},
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;
  taalMenuOpen = false;
  
  languages=["nl","fr", "en"];
  dropdownLanguages=["fr","en"];
  selectedLanguage= "nl";

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
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
    console.log(getCookie("language"))
  }

  changeLanguage(language: string){
    this.selectedLanguage = language;
    this.dropdownLanguages = this.languages.filter(e => e !== this.selectedLanguage);
  }

  // constructor(private translate: TranslateService) {
  //   translate.setDefaultLang('nl');

  // }
  constructor(private translate: TranslateService,
      translateCacheService: TranslateCacheService) {
        translate.setDefaultLang('nl');
        translateCacheService.init();
  }
  
  ngOnInit() {
    if(getCookie("language")!==undefined)
    {
      this.selectedLanguage= getCookie("language");
      this.changeLanguage(this.selectedLanguage);
    }
  }

}


export function getCookie(name: string) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");
  
  if (parts.length == 2) {
      return parts.pop().split(";").shift();
  }
}
