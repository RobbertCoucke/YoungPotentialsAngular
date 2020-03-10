import { Vacature } from './../_models/vacature';
import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { SollicitatieDialogComponent } from "app/sollicitatie-dialog/sollicitatie-dialog.component";
import { ActivatedRoute, Router } from '@angular/router';
import { VacatureService } from '@/_services/Vacature/vacature.service';  
import { AuthenticationService } from "@/_services/Authentication/authentication.service";
import { User, Company } from '@/_models';
import { UserService } from '@/_services/User/user.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

/**
 * @description Interface om data door te geven naar dialog
 */
export interface DialogData {
  UseremailValue: string;
  companyEmailValue: string;
}

@Component({
  selector: 'app-vacture-detail',
  templateUrl: './vacture-detail.component.html',
  styleUrls: ['./vacture-detail.component.scss']
})
export class VactureDetailComponent  {
  id: number;
  private $vacature: any;
  vacature : object;
  student : boolean;

  userID : any;
  currentUser: User;
  UseremailValue: string;
  cvURL: string;
  user: User;
  userHasCV: boolean;
  userCV: string;

  companyEmailValue: string;
  
  constructor(private dialog: MatDialog, private route: ActivatedRoute, 
              private vacatureService: VacatureService, 
              private authenticationService: AuthenticationService,
              private userService: UserService, ) { 
                this.route.paramMap.subscribe(params => {
                  this.id = parseInt(params.get('id'));
                  console.log(this.id);
                });
                this.vacatureService.getVacatureById(this.id).subscribe(data => this.vacature = data);
                this.vacatureService.getVacatureById(this.id).subscribe(data => this.companyEmailValue = data['email']);
              }


 ngOnInit(): void {
   this.student == true;

   this.authenticationService.currentUser.subscribe(u =>{
    if(u.role === 'User'){
        this.currentUser = u;
        this.UseremailValue = u.email;
        this.userService.getById(u.id).subscribe(c => {
          this.user = c;
          this.userCV = c.cvUrl;
        });
    }
  });
 }

 
 openDialog(): void {
  const dialogRef = this.dialog.open(SollicitatieDialogComponent, {
    width: "1200px",
    height: "500px",
    data: {UseremailValue: this.UseremailValue,  companyEmailValue: this.companyEmailValue}
  });
  // console.log(this.$vacature);
}

 testgeg() {
  console.log("Current user");
  console.log(this.currentUser);
  console.log(this.UseremailValue);
  console.log("User");
  console.log(this.user);
  console.log("Company");
  console.log(this.companyEmailValue);
  console.log("CV");
  console.log(this.userCV);
 }

 clicked(){
  console.log(this.vacature); 
  console.log(this.vacature['email']);
 }

}
