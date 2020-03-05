import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '@/_models';

@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<User[]>(`${config.apiUrl}/users`);
    }

    getById(id: number) {
        
    }
// voor user registratie
    register(register) {
        return this.http.post(`${config.apiUrl}/register`, register);
    }

// originele lijn
// register(user) {
//     return this.http.post(`${config.apiUrl}/users/register`, user);
// }


// nog niet in gebruik
    delete(id) {
        return this.http.delete(`${config.apiUrl}/users/${id}`);
    }


}

