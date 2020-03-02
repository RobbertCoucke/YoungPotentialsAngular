import { Component, OnInit } from '@angular/core';
import { Register } from '@/_models/register';
import { AuthenticationService } from '@/_services';
import { User } from '@/_models';
import { FavoritesService } from '@/_services/Favorites/favorites.service';
import { Vacature } from '@/_models/vacature';
import { $ } from 'protractor';
import { Favoriet } from '@/_models/favoriet';

@Component({
  selector: 'app-favorieten',
  templateUrl: './favorieten.component.html',
  styleUrls: ['./favorieten.component.scss']
})
export class FavorietenComponent implements OnInit {
  currentUser : User;
  offerList: Favoriet[] = [];


  constructor(private authenticationService: AuthenticationService,
              private favorieteService: FavoritesService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
   }

   onLike(id: number)
   {
     this.favorieteService.deleteFavorite(id);
     console.log(id)
     //this.ngOnInit();
   }

  ngOnInit() {
    this.favorieteService.getAllFavoritesFromUserId(this.currentUser.id).subscribe( (data) => {
      console.log(data);
      this.offerList = this.mapJSONToModel(data);
      console.log(this.offerList);
    });

  } 

  mapJSONToModel(data) : any[] {
    var list: Favoriet[] = [];
    data.forEach(f => {
      var vacature = new Vacature(f.offer);
      var favoriet = new Favoriet(f.id, vacature);
      list.push(favoriet);
    });

    return list;
  }

/*   10577
  10578
  10579 */

}
