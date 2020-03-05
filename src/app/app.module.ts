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



// used to create fake backend
import { fakeBackendProvider } from './_helpers';



import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AdminComponent } from './admin/admin.component';
import { LoginComponent } from './login/login.component';

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
import {MatStepperModule} from '@angular/material/stepper'; 
import {MatCheckboxModule} from '@angular/material/checkbox'; 
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog'; 

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
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
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
import { SollicitatieDialogComponent } from './sollicitatie-dialog/sollicitatie-dialog.component';
import { UploadComponent } from './upload/upload.component';

import { AuthGuard } from './_guards';
import { Role } from './_models';
import { RegisterComponent } from './register/register.component';
import { FavorietenComponent } from './favorieten/favorieten.component';
import { FaqComponent } from './faq/faq.component';


const appRoutes: Routes = [
  { path: "", component: HomeComponent},
  { path: "vactures", component: VacturesComponent},
  { path: "vacture-toevoegen", component: ReactiveFormComponent},
  { path: "vacature-details/:id", component: VactureDetailComponent},
  { path: "profiel", component:ProfileComponent},
  { path: "profiel-bewerken", component:ProfileEditComponent},
  { path: "faq", component:FaqComponent},
  //{ path: "inloggen", component:LoginComponent},
  { path: "registreren", component:RegisterComponent},
  { path: "favorieten", component:FavorietenComponent},

  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard]
},
{
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
},
{
    path: 'login',
    component: LoginComponent
},

// otherwise redirect to home
{ path: '**', redirectTo: '' }
];


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
    ReactiveFormComponent,
    AdminComponent,
    LoginComponent,
    FavorietenComponent,
    RegisterComponent,
    SollicitatieDialogComponent,
    UploadComponent,
    FaqComponent

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
    MatStepperModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
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

  providers: [{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider],
    bootstrap: [AppComponent],
    entryComponents: [
    SollicitatieDialogComponent
  ]
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
