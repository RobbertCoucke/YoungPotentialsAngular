import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.scss']
})
export class CookieComponent implements OnInit {
  // Show zorgt ervoor dat cookie popup wordt getoond.
  show:boolean = false;

  constructor() { }

  ngOnInit() {
    this.checkIfCookieExists();
  }

  /**
   * @description Controleert indien er al een cookie bestaat genaamd "Cookie", indien hij onbestaand is dan wordt de cookie popup getoond.
   */
  checkIfCookieExists()
  {
    if(getCookie("cookie") == undefined)
    {
      this.show = true;
    }
  }

  /**
   * @description Methode die ervoor zorgt dat de cookie pop up verdwijnt en de keuze ervan 60 dagen onthoudt.
   * @param accept  Indien true dan heeft men de cookie voorwaarden geaccepteerd,
   *                indien false dan heeft de gebruiker de negeer button aangeklikt.
   */
  btnClick(accept:boolean){
    console.log("accepteer:" + accept);
    this.show = false;
    setCookie("cookie", accept, 365);
  }
}

// Functie om een cookie op te vragen.
export function getCookie(name: string) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");

  if (parts.length == 2) {
      return parts.pop().split(";").shift();
  }
}

// Functie om een cookie aan te maken.
export function setCookie(name: string, value: boolean, expireDays: number, path: string = '') {
  let d:Date = new Date();
  d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
  let expires:string = `expires=${d.toUTCString()}`;
  let cpath:string = path ? `; path=${path}` : '';
  document.cookie = `${name}=${value}; ${expires}${cpath}`;
}
