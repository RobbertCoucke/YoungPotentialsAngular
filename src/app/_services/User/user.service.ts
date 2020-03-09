import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '@/_models';
import { UpdateUser } from '@/_models/updateUser';

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
}
