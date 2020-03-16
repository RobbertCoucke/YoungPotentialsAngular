import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '@/_models/contact';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }


  sendMail(contact: Contact)
  {
    return this.http.post<any>(`${this.apiUrl}contact`, contact);
  }
}
