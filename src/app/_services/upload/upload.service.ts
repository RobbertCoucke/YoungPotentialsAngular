import { Injectable } from "@angular/core";
import { HttpClient, HttpResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { RequestOptions, ResponseContentType } from "@angular/http";

@Injectable({
  providedIn: "root"
})
export class UploadService {
  constructor(private http: HttpClient) {}

  //TODO change any to model!!

  API_URL =
    "https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/upload/download/";

  upload(formData: FormData) {
    return this.http.post<any>(
      `https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/upload`,
      formData
    );
  }

  getFilePath(isUser: boolean, id: number) {
    return this.http.get<any>(
      `https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/upload/file/${isUser}/${id}`
    );
  }

  download(isUser: boolean, id: number) {
    return this.http.get<any>(
      `https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/upload/download/${isUser}/${id}`
    );
  }

  downloadLink(isUser: boolean, id: number): Observable<HttpResponse<Blob>> {
    return this.http.get<Blob>(this.API_URL + isUser + "/" + id, {
      observe: "response",
      responseType: "blob" as "json"
    });
  }

  delete(isUser: boolean, id: number) {
    return this.http.delete<any>(
      `https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/upload/delete/${isUser}/${id}`
    );
  }
}
