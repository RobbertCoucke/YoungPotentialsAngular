import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpEventType, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})


export class UploadComponent implements OnInit {

  public progress: number;
  public message: string;
  @Output() public onUploadFinished = new EventEmitter();
 
  constructor(private http: HttpClient) { }

  ngOnInit() {

  }

  public uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }

    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload);
    
    if(fileToUpload.size > 1024 * 1024 * 20 ) {
      console.log("Max toegelaten file groote is 20 mb.")
      return;
    }
    console.log("posting");
    this.http.post('http://localhost:60213/upload', formData)
       .subscribe(
         //event => {
      //   if (event.type === HttpEventType.UploadProgress)
      //     this.progress = Math.round(100 * event.loaded / event.total);
      //   else if (event.type === HttpEventType.Response) {
      //     this.message = 'Upload success.';
      //     this.onUploadFinished.emit(event.body);
      //   }
      // }, 
        error => {
          console.log(error);
      });
  }
}

