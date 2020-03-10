import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  //TODO change any to model!!

  upload(formData: FormData) {
    return this.http.post<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/upload`, formData);
  }

  getFilePath(isUser: boolean, id: number) {
    return this.http.get<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/upload/file/${isUser}/${id}`);
  }

  download(isUser: boolean, id: number){
    return this.http.get<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/upload/download/${isUser}/${id}`);
  }

  delete(isUser: boolean, id: number){
    return this.http.delete<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/upload/delete/${isUser}/${id}`);
  }
}
