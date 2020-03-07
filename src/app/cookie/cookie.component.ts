import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cookie',
  templateUrl: './cookie.component.html',
  styleUrls: ['./cookie.component.scss']
})
export class CookieComponent implements OnInit {
  //Show zorgt ervoor dat cookie model wordt getoond.
  show:boolean = false;
  constructor() { }

  ngOnInit() {
    console.log("Works ?")
    console.log(getCookie("cookie"))
    if(getCookie("cookie") == undefined)
    {
      console.log("HEEYY")
      this.show=true;
    }
  }

  btnClick(accept:boolean){
    console.log("accepteer:" + accept);
    this.show = false;
    setCookie("cookie",accept,365);
  }
}

export function getCookie(name: string) {
  const value = "; " + document.cookie;
  const parts = value.split("; " + name + "=");

  if (parts.length == 2) {
      return parts.pop().split(";").shift();
  }
}

export function setCookie(name: string, value: boolean, expireDays: number, path: string = '') {
  let d:Date = new Date();
  d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
  let expires:string = `expires=${d.toUTCString()}`;
  let cpath:string = path ? `; path=${path}` : '';
  document.cookie = `${name}=${value}; ${expires}${cpath}`;
}
