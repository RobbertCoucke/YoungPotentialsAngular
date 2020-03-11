import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SollicitatieDialogComponent } from "app/sollicitatie-dialog/sollicitatie-dialog.component";
import { ActivatedRoute, Router } from '@angular/router';
import { VacatureService } from '@/_services/Vacature/vacature.service'; 
import { Vacature } from '@/_models/vacature';


import { AuthenticationService } from "@/_services/Authentication/authentication.service";
import { User, Company } from '@/_models';
import { UserService } from '@/_services/User/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { UploadService } from "@/_services/upload/upload.service";

/**
 * @description Interface om data door te geven naar dialog
 */
export interface DialogData {
  UseremailValue: string;
  companyEmailValue: string;
  userHasCV: boolean;
}


@Component({
  selector: 'app-vacture-detail',
  templateUrl: './vacture-detail.component.html',
  styleUrls: ['./vacture-detail.component.scss']
})
export class VactureDetailComponent  {
  id: number;
  vacature: Vacature;

  student: boolean;

  userID: any;
  currentUser: User;
  UseremailValue: string;
  cvURL: string;
  user: User;
  userHasCV: boolean;
  userCV: string;
  loading: boolean = true;

  companyEmailValue: string;
  
  constructor(private dialog: MatDialog, private route: ActivatedRoute, 
              private vacatureService: VacatureService, 
              private authenticationService: AuthenticationService,
              private userService: UserService,
              private uploadService: UploadService ) { 
                this.route.paramMap.subscribe(params => {
                  this.id = parseInt(params.get('id'));
                  console.log(this.id);
                });
                
              }


 ngOnInit(): void {
   //TODO: DATUM GEPLAATST vacature.calculateDate() laten werken, momenteel is er error _co.vacature.calculateDate() is not a function.
  this.vacatureService.getVacatureById(this.id).subscribe(data => {this.vacature = new Vacature(data);
  this.loader(this.vacature);
  }
  );
  this.vacatureService.getVacatureById(this.id).subscribe(data => this.companyEmailValue = data['email']);
  this.uploadService.getFilePath(true,this.userID).subscribe(data => this.userCV = data);
  //this.uploadService.getFilePath(this.student,this.userID).subscribe(data => this.userCV = data[''])
  this.HasCV()
   this.student == true;

   this.authenticationService.currentUser.subscribe(u =>{
    if(u.role === 'User'){
        this.currentUser = u;
        this.UseremailValue = u.email;
        this.userID = u.id;
        this.userService.getById(u.id).subscribe(c => {
          this.user = c;
        });
    }
  });
 }

 loader(x)
 {
   this.loading = false;
 }

 
 openDialog(): void {
  const dialogRef = this.dialog.open(SollicitatieDialogComponent, {
    width: "1200px",
    height: "500px",
    data: {UseremailValue: this.UseremailValue,
           companyEmailValue: this.companyEmailValue,
           userHasCV: this.userHasCV}
  });
  // console.log(this.$vacature);
}

HasCV(){
  if(this.userCV == null) {
    this.userHasCV = false;
  }
  else {
    this.userHasCV = true;
  }
}


 testgeg() {
  // console.log("Current user");
  console.log(this.currentUser);
  // console.log(this.UseremailValue);
  // console.log("User");
  console.log(this.user);
  // console.log("Company");
  // console.log(this.companyEmailValue);
  // console.log("CV");
  // console.log(this.userCV);
  console.log(this.userHasCV);
  console.log(this.userCV);
  console.log(this.userID)
 }

 clicked(){
  console.log(this.vacature); 
  console.log(this.vacature['email']);
 }

}
