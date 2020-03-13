import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '@/_models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(private http: HttpClient) { }


  sendMail(contact: Contact)
  {
    return this.http.post<any>('https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/contact', contact);
  }
}
