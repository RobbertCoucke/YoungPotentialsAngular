import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

  constructor(private http: HttpClient) { }

  //TODO change any to model!!

  getAllFavoritesFromUserId(id: number) {
    return this.http.get<any[]>(`http://youngpotentials.azurewebsites.net/favorites/user/${id}`);
  }

  addFavorite(userId: number, vacatureId: number) {
    return this.http.post<any>(`http://youngpotentials.azurewebsites.net/favorites`, {userId: userId, offerId: vacatureId});
  }

  deleteFavorite(id: number){
    return this.http.delete<any>(`http://youngpotentials.azurewebsites.net/favorites/${id}`);
  }
}

