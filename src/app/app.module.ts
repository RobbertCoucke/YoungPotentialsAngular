import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from '@angular/router';

/**
 * * Components imports
 */
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { VactureItemComponent } from "./vacture-item/vacture-item.component";
import { VacturesComponent } from "./vactures/vactures.component";
import { ProfileComponent } from "./profile/profile.component";
import { ProfileEditComponent } from "./profile-edit/profile-edit.component";
import { VactureDetailComponent } from "./vacture-detail/vacture-detail.component";
import { VactureFilterComponent } from "./vacture-filter/vacture-filter.component";
import { HomeComponent } from "./home/home.component";
import { FooterComponent } from "./footer/footer.component";
import { ReactiveFormComponent } from "./reactive-form/reactive-form.component";

/**
 * * Material Angular UI imports
 */
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  MatAutocompleteModule,
  MatFormFieldModule,
  MatSelectModule
} from "@angular/material"; //done
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatCardModule } from "@angular/material/card";
import { MatExpansionModule } from "@angular/material/expansion";

/**
 * * Anuglar Bootstrap imports
 */

import { BsDatepickerModule } from "ngx-bootstrap";
import { ButtonsModule } from "ngx-bootstrap/buttons";

/**
 * * import ngx-translate and the http loader
 */
import { TranslateLoader, TranslateModule } from "@ngx-translate/core";
import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { TranslateService } from "@ngx-translate/core";
import {
  TranslateCacheModule,
  TranslateCacheSettings,
  TranslateCacheService
} from "ngx-translate-cache";

/**
 * * Andere imports
 */
import { ReactiveFormsModule } from "@angular/forms";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";

const appRoutes: Routes = [
  { path: "", component: HomeComponent},
  { path: "vactures", component: VacturesComponent},
  { path: "vacture-toevoegen", component: ReactiveFormComponent},
  { path: "vacture-detail", component: VactureDetailComponent},
  { path: "profiel", component:ProfileComponent},
  { path: "profiel-bewerken", component:ProfileEditComponent}
]


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
    HomeComponent,
    FooterComponent,
    ReactiveFormComponent
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
    ButtonsModule.forRoot(),
    // ngx-translate and the loader module
    HttpClientModule,
    RouterModule.forRoot( appRoutes, { enableTracing: true}),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    TranslateCacheModule.forRoot({
      cacheService: {
        provide: TranslateCacheService,
        useFactory: translateCacheFactory,
        deps: [TranslateService, TranslateCacheSettings]
      },
      cacheName: "language", // default value is 'lang'.
      cacheMechanism: "Cookie" // default value is 'LocalStorage'.
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}

export function translateCacheFactory(
  translateService: TranslateService,
  translateCacheSettings: TranslateCacheSettings
) {
  return new TranslateCacheService(translateService, translateCacheSettings);
}
