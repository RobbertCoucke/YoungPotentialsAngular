import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

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
import { SollicitatieDialogComponent } from "./sollicitatie-dialog/sollicitatie-dialog.component";
import { UploadComponent } from "./upload/upload.component";

// Paging
import { JwPaginationComponent } from "jw-angular-pagination";

// used to create fake backend
import { fakeBackendProvider } from "./_helpers";

import { JwtInterceptor, ErrorInterceptor } from "./_helpers";
import { AdminComponent } from "./admin/admin.component";
import { LoginComponent } from "./login/login.component";

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

import { MatStepperModule } from "@angular/material/stepper";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { MatPaginatorModule } from "@angular/material/paginator";

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
import {
  HttpClient,
  HttpClientModule,
  HTTP_INTERCEPTORS
} from "@angular/common/http";
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

import { AuthGuard } from "./_guards";
import { Role } from "./_models";
import { RegisterComponent } from "./register/register.component";
import { FavorietenComponent } from "./favorieten/favorieten.component";
import { FaqComponent } from "./faq/faq.component";

import { NgSelectModule } from "@ng-select/ng-select";
import { FormsModule } from "@angular/forms";
import { SelectStudiegebiedenComponent } from "./select-studiegebieden/select-studiegebieden.component";
import { NavormingComponent } from "./navorming/navorming.component";

import { VerifyComponent } from "./verify/verify.component";
import { CompanyVacaturesComponent } from "./company-vacatures/company-vacatures.component";
import { CompanyItemComponent } from "./company-item/company-item.component";

import { CookieComponent } from "./cookie/cookie.component";
import { PagingComponent } from "./paging/paging.component";
import { AngularStickyThingsModule } from "@w11k/angular-sticky-things";

import { PolicyComponent } from "./policy/policy.component";

import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { EmailPasswordRequestComponent } from './email-password-request/email-password-request.component';
import { MessageComponent } from './message/message.component';
import { WachtwoordVeranderdComponent } from './wachtwoord-veranderd/wachtwoord-veranderd.component';
import { ContactComponent } from './contact/contact.component';

import { MatSnackBarModule } from "@angular/material/snack-bar";

const appRoutes: Routes = [
  { path: "owned", component : CompanyVacaturesComponent},
  { path: "verify", component: VerifyComponent},
  { path: "", component: HomeComponent},
  { path: "vactures", component: VacturesComponent},
  { path: "vacture-toevoegen", component: ReactiveFormComponent},
  { path: "vacature-details/:id", component: VactureDetailComponent},
  { path: "profiel", component:ProfileComponent},
  { path: "profiel-bewerken", component:ProfileEditComponent},
  { path: "faq", component:FaqComponent},
  { path: "navorming", component:NavormingComponent},
  { path: "policy", component:PolicyComponent},
  { path: "vacatures", component:HomeComponent},
  { path: "contact", component:ContactComponent},


  //{ path: "inloggen", component:LoginComponent},

  { path: "registreren", component: RegisterComponent },
  { path: "favorieten", component: FavorietenComponent },

  {
    path: "",
    component: HomeComponent,
    canActivate: [AuthGuard]
  },
  {
    path: "admin",
    component: AdminComponent,
    canActivate: [AuthGuard],
    data: { roles: [Role.Admin] }
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "wachtwoord-reseten",
    component: ResetPasswordComponent
  },
  {
    path: "wachtoord-veranderen-aanvraag",
    component: EmailPasswordRequestComponent
  },
  {
    path: "message",
    component: MessageComponent
  },
  {
    path: "succes-message",
    component: WachtwoordVeranderdComponent
  },

  // otherwise redirect to home
  { path: "**", redirectTo: "" }
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
      FaqComponent,
      SelectStudiegebiedenComponent,
      NavormingComponent,
      JwPaginationComponent,
      CookieComponent,
      PagingComponent,
      VerifyComponent,
      CompanyVacaturesComponent,
      CompanyItemComponent,
      ResetPasswordComponent,
      EmailPasswordRequestComponent,
      MessageComponent,
      WachtwoordVeranderdComponent,
      PolicyComponent,
      ContactComponent
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
      NgSelectModule,
      MatPaginatorModule,
      FormsModule,
      AngularStickyThingsModule,
      MatSnackBarModule,
      BsDatepickerModule.forRoot(),
      ButtonsModule.forRoot(),
      //ngx-translateandtheloadermodule\\\\r\\\\nHttpClientModule,
      HttpClientModule,
      RouterModule.forRoot(appRoutes, {
        onSameUrlNavigation: "reload",
        anchorScrolling: 'enabled',
      }),
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

  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },

    // provider used to create fake backend
    fakeBackendProvider
  ],
  bootstrap: [AppComponent],
  entryComponents: [SollicitatieDialogComponent]
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
