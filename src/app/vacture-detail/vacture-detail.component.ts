import { Component } from "@angular/core";
import { SollicitatieDialogComponent } from "app/sollicitatie-dialog/sollicitatie-dialog.component";
import { ActivatedRoute, Router } from "@angular/router";
import { VacatureService } from "@/_services/Vacature/vacature.service";
import { Vacature } from "@/_models/vacature";
import { AuthenticationService } from "@/_services/Authentication/authentication.service";
import { User } from "@/_models";
import { UserService } from "@/_services/User/user.service";
import { MatDialog } from "@angular/material/dialog";
import { UploadService } from "@/_services/upload/upload.service";
import { HttpResponse } from "@angular/common/http";
import FileSaver from "file-saver";
import { MatSnackBar } from "@angular/material";

/**
 * @description Interface om data door te geven naar dialog
 */
export interface DialogData {
  hasBijlage: any;
  UseremailValue: string;
  companyEmailValue: string;
}

@Component({
  selector: "app-vacture-detail",
  templateUrl: "./vacture-detail.component.html",
  styleUrls: ["./vacture-detail.component.scss"]
})
export class VactureDetailComponent {
  id: number; // id van vacature
  vacature: Vacature; // Vacature object met alle velden van vacature

  hasBijlage: boolean; //tells if vacature has bijlage attached to it

  student: boolean; // true = student | false = bedrijf

  currentUser: User; // User object met alle velden van user
  UseremailValue: string; // Email van ingelogde user
  user: User; // User object van user algemeen

  companyEmailValue: string; // Email van ingelogde bedrijf

  loading: boolean = true; // Loader

  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private vacatureService: VacatureService,
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private uploadService: UploadService,
    private _snackBar: MatSnackBar
  ) {
    this.route.paramMap.subscribe(params => {
      this.id = parseInt(params.get("id"));
    });
  }

  ngOnInit(): void {
    //TODO: DATUM GEPLAATST vacature.calculateDate() laten werken, momenteel is er error _co.vacature.calculateDate() is not a function.
    this.vacatureService.getVacatureById(this.id).subscribe(data => {
      this.vacature = new Vacature(data);
      this.companyEmailValue = data["email"];
      this.loader(this.vacature);

      this.uploadService
        .getFilePath(false, this.vacature.id)
        .subscribe(data => {
          if (data != null) this.hasBijlage = true;
          else this.hasBijlage = false;
        });
    });

    this.authenticationService.currentUser.subscribe(u => {
      if (u && u.role === "User") {
        this.currentUser = u;
        this.UseremailValue = u.email;
        this.userService.getById(u.id).subscribe(c => {
          this.user = c;
        });
        this.student == true;
      }
    });
  }

  loader(x) {
    this.loading = false;
  }

  /**
   * @description opent sollicitatie dialoog
   * *data: values die we willen gebruiken in dialoog
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(SollicitatieDialogComponent, {
      width: "1200px",
      height: "560px",
      data: {
        UseremailValue: this.UseremailValue,
        companyEmailValue: this.companyEmailValue,
        hasBijlage: this.hasBijlage
      }
    });
    // console.log(this.$vacature);
  }

  /**
   * @description downloaden files
   * Haalt filename uit Header content-disposition en stopt deze in blob bestand
   * Filesaver package zorgt voor popup menu om op te slaan
   */
  startDownload() {
    this.uploadService
      .downloadLink(false, this.id)
      .subscribe((resp: HttpResponse<Blob>) => {
        const data = resp.body;
        console.log("body:");
        console.log(data);
        var pdf = new Blob([data], { type: "application/pdf" });
        FileSaver.saveAs(pdf, this.vacature.title + "_bijlage.pdf");
      });
  }

  /**
   * @description opent een snackbar popup wanneer op open bijlage wordt geklikt
   */
  openSnackBar() {
    let snackBarRef = this._snackBar.open("Downloading", "Ok");
  }
}
