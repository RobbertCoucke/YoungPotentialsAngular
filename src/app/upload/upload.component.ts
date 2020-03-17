import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { HttpEventType, HttpClient } from "@angular/common/http";
import { FormControl, Validators } from "@angular/forms";

@Component({
  selector: "app-upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"]
})
export class UploadComponent implements OnInit {

  ifFileSize: boolean = false;
  ifNotPDF: boolean = false;

  hasFile: boolean;
  fileValue: string;

  public progress: number;
  public message: string;

  @Output() public uploadHandler = new EventEmitter();

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  public uploadFile = files => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append("file", fileToUpload);

    if (fileToUpload.size > 1024 * 1024 * 2) {
      this.ifFileSize = true;
       return;
    }

    var allowedFile = [".pdf"];
    var regex = new RegExp(
      "([a-zA-Z0-9s_\\.-:])+(" + allowedFile.join("|") + ")$"
    );
    console.log("name:" + fileToUpload.type);
    if (!regex.test(fileToUpload.type.toLowerCase())) {
      this.ifNotPDF = true;
      return;
    } 

    this.uploadHandler.emit(formData);
  };

  @Output() messageEvent = new EventEmitter<boolean>();

  public checkIfHasFile() {
    if (this.fileValue === "") {
      this.hasFile = false;
      return false;
    } else {
      this.hasFile = true;
      return true;
    }

    this.messageEvent.emit(this.hasFile);
  }
}
