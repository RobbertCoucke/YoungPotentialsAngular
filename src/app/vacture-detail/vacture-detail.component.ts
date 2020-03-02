import { Component, OnInit } from '@angular/core';
import {
  MatDialog,
} from "@angular/material";
import { SollicitatieDialogComponent } from "app/sollicitatie-dialog/sollicitatie-dialog.component";

@Component({
  selector: 'app-vacture-detail',
  templateUrl: './vacture-detail.component.html',
  styleUrls: ['./vacture-detail.component.scss']
})
export class VactureDetailComponent {

  
  constructor(private dialog: MatDialog) { }

  openDialog(): void {
    const dialogRef = this.dialog.open(SollicitatieDialogComponent, {
      width: "900px",
      height: "500px",
    });
  }
}
