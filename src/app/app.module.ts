import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { NavbarComponent } from './navbar/navbar.component';

// import ngx-translate and the http loader
import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import {HttpClient, HttpClientModule} from '@angular/common/http';

=======
import { VactureItemComponent } from './vacture-item/vacture-item.component';
import { VacturesComponent } from './vactures/vactures.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfileEditComponent } from './profile-edit/profile-edit.component';
import { VactureDetailComponent } from './vacture-detail/vacture-detail.component';
import { VactureFilterComponent } from './vacture-filter/vacture-filter.component';
import { NavbarComponent } from './navbar/navbar.component'
import { AddVacAnonymousComponent } from './add-vac-anonymous/add-vac-anonymous.component'
>>>>>>> master
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
    AppRoutingModule,

    // ngx-translate and the loader module
    HttpClientModule,
    TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
