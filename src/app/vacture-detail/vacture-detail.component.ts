import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  MatDialog,
} from "@angular/material";
import { SollicitatieDialogComponent } from "app/sollicitatie-dialog/sollicitatie-dialog.component";
import { ActivatedRoute, Router } from '@angular/router';
import { VacatureService } from '@/_services/Vacature/vacature.service'; 
import { Vacature } from '@/_models/vacature';

@Component({
  selector: 'app-vacture-detail',
  templateUrl: './vacture-detail.component.html',
  styleUrls: ['./vacture-detail.component.scss']
})
export class VactureDetailComponent  {
  id: number;
  //private $vacature: any;
  vacature : Vacature;
  student : boolean;

  
  constructor(private dialog: MatDialog, private route: ActivatedRoute, 
              private vacatureService: VacatureService) { 
                this.route.paramMap.subscribe(params => {
                  this.id = parseInt(params.get('id'));
                  console.log(this.id);
                });
              }

  openDialog(): void {
    const dialogRef = this.dialog.open(SollicitatieDialogComponent, {
      width: "1200px",
      height: "500px",
    });
    //console.log(this.$vacature);
  }

 ngOnInit(): void {
  this.vacatureService.getVacatureById(this.id).subscribe(data => this.vacature = new Vacature(data) );

   this.student == true;
 }

 clicked(){
  console.log(this.vacature); 
 }

}
