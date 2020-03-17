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

  //TODO change any to model!!

  apiUrl = environment.apiUrl;
  upload(formData: FormData) {
    return this.http.post<any>(
      this.apiUrl + `upload`,
      formData
    );
  }

  getFilePath(isUser: boolean, id: number) {
    return this.http.get<any>(
      this.apiUrl + `upload/file/${isUser}/${id}`
    );
  }

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

  delete(isUser: boolean, id: number) {
    return this.http.delete<any>(
      this.apiUrl+`upload/delete/${isUser}/${id}`
    );
  }
}
