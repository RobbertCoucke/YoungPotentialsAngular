import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '@/_models';
import { UpdateUser } from '@/_models/updateUser';
import { UpdatePasswordRequest } from '@/_models/updatePasswordRequest';
import { EmailRequest } from '@/_models/emailRequest';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http: HttpClient) { }

  getAll()
  {
    return this.http.get<any>("https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/user");
  }

  getById(id: number)
  {
    return this.http.get<any>(`https://cors-anywhere.herokuapp.com/https://youngpotentials.azurewebsites.net/user/${id}`);
  }

  updateUser(id: number, user: UpdateUser)
  {
    return this.http.put<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/user/${id}`, user);
  }

  deleteUser(id: number)
  {
    return this.http.delete<any>(`https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/user/${id}`);
  }

  forgotPassword(object: EmailRequest)
  {
    return this.http.post<any>('https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/user/password', object);
  }

  resetPassword(object: UpdatePasswordRequest)
  {
        const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json',
          'Authorization': object.token
        })
      };
      return this.http.put<any>('https://cors-anywhere.herokuapp.com/http://youngpotentials.azurewebsites.net/user/password/reset', object,  httpOptions)
      
    

  }
}
