import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from 'src/navbar/navbar.component';
import { AddVacAnonymousComponent } from './add-vac-anonymous/add-vac-anonymous.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    AddVacAnonymousComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
