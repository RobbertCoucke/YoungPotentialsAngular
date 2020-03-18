import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { RequestOptions, ResponseContentType } from "@angular/http";
import {environment} from '../../../environments/environment'

@Injectable({
  providedIn: "root"
})
export class UploadService {
  constructor(private http: HttpClient) {}

 
  apiUrl = environment.apiUrl;

  //* stores file under users or offers 
  upload(formData: FormData) {
    return this.http.post<any>(
      this.apiUrl + `upload`,
      formData
    );
  }

  //* returns the online path of the requested file
  getFilePath(isUser: boolean, id: number) {
    return this.http.get<any>(
      this.apiUrl + `upload/file/${isUser}/${id}`
    );
  }

  //* returns the requested file
  download(isUser: boolean, id: number) {
    return this.http.get<any>(
      this.apiUrl+`upload/download/${isUser}/${id}`
    );
  }


  downloadLink(isUser: boolean, id: number): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(this.apiUrl + isUser + "/" + id, {
      observe: "response",
      responseType: "blob" as "json"
    });
  }

  //* deletes a file
  delete(isUser: boolean, id: number) {
    return this.http.delete<any>(
      this.apiUrl+`upload/delete/${isUser}/${id}`
    );
  }
}
