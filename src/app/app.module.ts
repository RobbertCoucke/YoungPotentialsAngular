import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/**
 * * Components imports
 */
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormComponent } from './reactive-form/reactive-form.component';

/**
 * * Material Angular UI imports
*/
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule, MatFormFieldModule, MatSelectModule} from "@angular/material"; //done
import {MatInputModule} from '@angular/material/input'; 
import {MatMenuModule} from '@angular/material/menu'; 
import {MatCardModule} from '@angular/material/card'; 
import {MatExpansionModule} from '@angular/material/expansion';

 /**
  * * Anuglar Bootstrap imports
  */ 
 import { BsDatepickerModule } from 'ngx-bootstrap'; 
 import { ButtonsModule } from 'ngx-bootstrap/buttons';

 /**
 * * Andere imports
 */
import { ReactiveFormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ReactiveFormComponent,
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule,
    NgMultiSelectDropDownModule,
    BsDatepickerModule.forRoot(),
    ButtonsModule.forRoot()],
 providers: [],
 bootstrap: [ AppComponent ]
 })
export class AppModule { }
