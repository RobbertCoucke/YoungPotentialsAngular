import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VactureItemComponent } from './vacture-item/vacture-item.component';
import { VacturesComponent } from './vactures/vactures.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { VactureDetailComponent } from './vacture-detail/vacture-detail.component';
import { VactureFilterComponent } from './vacture-filter/vacture-filter.component';
import { NavbarComponent } from './navbar/navbar.component'
import { AddVacAnonymousComponent } from './add-vac-anonymous/add-vac-anonymous.component'
@NgModule({
  declarations: [
    AppComponent,
    VactureItemComponent,
    VacturesComponent,
    ProfileComponent,
    ProfileEditComponent,
    VactureDetailComponent,
    VactureFilterComponent,
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
