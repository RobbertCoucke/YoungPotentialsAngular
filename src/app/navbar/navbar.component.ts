import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  navbarOpen = false;
  taalMenuOpen = false;

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

  constructor() { }

  ngOnInit() {
  }

}
