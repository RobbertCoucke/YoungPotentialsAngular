import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }



  getAllFavoritesFromUserId(id: number) {
    return this.http.get<any[]>(`${this.apiUrl}favorites/user/${id}`);
  }

  addFavorite(userId: number, vacatureId: number) {
    return this.http.post<any>(`${this.apiUrl}favorites`, {userId: userId, offerId: vacatureId});
  }

  deleteFavorite(id: number){
    return this.http.delete<any>(`${this.apiUrl}favorites/${id}`);
  }
}

