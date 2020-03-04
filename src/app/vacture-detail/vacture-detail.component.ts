import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  MatDialog,
} from "@angular/material";
import { SollicitatieDialogComponent } from "app/sollicitatie-dialog/sollicitatie-dialog.component";
import { ActivatedRoute, Router } from '@angular/router';
import { Vacature } from '@/_models/vacature';
import { VacatureService } from '@/_services/Vacature/vacature.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-vacture-detail',
  templateUrl: './vacture-detail.component.html',
  styleUrls: ['./vacture-detail.component.scss']
})
export class VactureDetailComponent  {
  id: number;
  private $vacature: any;
  vacature : object;

  
  constructor(private dialog: MatDialog, private route: ActivatedRoute, 
              private vacatureService: VacatureService) { 
                this.route.paramMap.subscribe(params => {
                  this.id = parseInt(params.get('id'));
                  console.log(this.id);
                });
                this.vacatureService.getVacatureById(this.id).subscribe(data => this.vacature = data );
              }

  openDialog(): void {
    const dialogRef = this.dialog.open(SollicitatieDialogComponent, {
      width: "900px",
      height: "500px",
    });
    

    console.log(this.$vacature);
  }

 ngOnInit(): void {
 }

 clicked(){
  console.log(this.vacature); 
 }

}
