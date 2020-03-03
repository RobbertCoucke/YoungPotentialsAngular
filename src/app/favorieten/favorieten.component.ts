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


  ngOnInit() {
    this.favorieteService.getAllFavoritesFromUserId(this.currentUser.id).subscribe( (data) => {

      this.offerList = this.mapJSONToModel(data);
    });

  } 

  removeEvent(favorite: Favoriet){

    setTimeout( () => this.offerList = this.offerList.filter(o => o !== favorite), 1000);
  }

  mapJSONToModel(data) : any[] {
    var list: Favoriet[] = [];
    data.forEach(f => {
      var vacature = new Vacature(f.vacature);
      var favoriet = new Favoriet(f.id, vacature);
      list.push(favoriet);
    });

    return list;
  }


}
