import { Component, Output, EventEmitter } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"]
})
export class UploadComponent {
  ifFileSize: boolean = false; // of file groter is dan maximum grootte (2MB)
  ifNotPDF: boolean = false; //of file een PDF is
  hasFile: boolean = false; // of er een file is upgeloaden
  fileValue: string; //inhoud file

  // public progress: number;
  // public message: string;

  @Output() public uploadHandler = new EventEmitter();

  constructor(private http: HttpClient) {}

  /**
   * @description upgeloade file in formData object stoppen
   * Wordt doorgegeven aan uploadHandler om naar backend te versturen
   */
  public uploadFile = files => {
    // Controle of file niet leeg is
    if (files.length === 0) {
      return;
    }

    // aanmaken formData object
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append("file", fileToUpload);

    // controle of de filegrootte > 2MB
    if (fileToUpload.size > 1024 * 1024 * 2) {
      this.ifFileSize = true; //heeft errormessage weer als filegrootte > 2MB
      return;
    }

    // regex om type van file te controleren
    var allowedFile = [".pdf"];
    var regex = new RegExp(
      "([a-zA-Z0-9s_\\.-:])+(" + allowedFile.join("|") + ")$"
    );
    //controle of type van file een pdf is, type zou applicationtype:pdf moeten zijn
    if (!regex.test(fileToUpload.type.toLowerCase())) {
      this.ifNotPDF = true; //heeft errormessage weer als een ander bestand wordt opgegeven
      return;
    }
    this.uploadHandler.emit(formData); //doorsturen file als formdata
  };

  @Output() messageEvent = new EventEmitter<boolean>();

  /**
   * @description controleert of er een file is upgeload
   */
  public checkIfHasFile() {
    if (this.fileValue === "") {
      this.hasFile = false;
      return false;
    } else {
      this.hasFile = true;
      return true;
    }
  }
}
