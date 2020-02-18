import { NgModule } from "@angular/core";
import {
  MatAutocompleteModule,
  MatInputModule,
  MatFormFieldModule,
} from "@angular/material";

@NgModule({
  imports: [MatAutocompleteModule, MatInputModule, MatFormFieldModule],
  exports: [MatAutocompleteModule, MatInputModule, MatFormFieldModule]
})
export class AngularMaterialModule {}
