import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '@/_models';
import { UpdateUser } from '@/_models/updateUser';
import { UpdatePasswordRequest } from '@/_models/updatePasswordRequest';
import { EmailRequest } from '@/_models/emailRequest';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl = environment.apiUrl;


  constructor(private http: HttpClient) { }

  //* returns all users
  getAll()
  {
    return this.http.get<any>(`${this.apiUrl}user`);
  }

  //* returns student or company by id
  getById(id: number)
  {
    return this.http.get<any>(`${this.apiUrl}user/${id}`);
  }

  //* updates a student or company
  updateUser(id: number, user: UpdateUser)
  {
    return this.http.put<any>(`${this.apiUrl}user/${id}`, user);
  }

  //* removes a user (user only, not student or company)
  deleteUser(id: number)
  {
    return this.http.delete<any>(`${this.apiUrl}user/${id}`);
  }

  //* sends a mail with a link to reset password
  forgotPassword(object: EmailRequest)
  {
    return this.http.post<any>(`${this.apiUrl}user/password`, object);
  }

  //* resets password to new
  resetPassword(object: UpdatePasswordRequest)
  {
        const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': object.token
        })
      };
      return this.http.put<any>(`${this.apiUrl}user/password/reset`, object,  httpOptions)
      
    

  }
}
