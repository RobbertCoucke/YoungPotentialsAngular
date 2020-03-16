import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { User } from '@/_models';
import { Register } from '@/_models/register';
import {environment} from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<User>;
    //het ingelogde gebruiker
    public currentUser: Observable<User>;
    apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(email: string, password: string) {
        return this.http.post<any>(`${this.apiUrl}user/authenticate`, { email, password })
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }

    register(reg: Register) {
<<<<<<< HEAD
        return this.http.post<any>('https://cors-anywhere.herokuapp.com/https://youngpotentials.azurewebsites.net/user/register', reg)
=======
        return this.http.post<any>(`${this.apiUrl}user/register`, reg)

>>>>>>> db9a8e3ffa1201eb95165655cd61ea84a6c10458
        .pipe(map(user => {
            //register succesful if there's a jwt token in the response
            if(user && user.token){
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
            }
        }));

    }
}