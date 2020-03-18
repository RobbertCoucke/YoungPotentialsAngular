import { Component, OnInit } from '@angular/core';
import { Register } from '@/_models/register';
import { AuthenticationService } from '@/_services';
import { User, Role } from '@/_models';
import { FavoritesService } from '@/_services/Favorites/favorites.service';
import { Vacature } from '@/_models/vacature';
import { $ } from 'protractor';
import { Favoriet } from '@/_models/favoriet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorieten',
  templateUrl: './favorieten.component.html',
  styleUrls: ['./favorieten.component.scss']
})
export class FavorietenComponent implements OnInit {
  currentUser : User;
  offerList: Favoriet[] = [];
  loading: boolean = true;
  error: boolean = false;


  constructor(private authenticationService: AuthenticationService,
              private favorieteService: FavoritesService, private router: Router) {

    //* checks if the user is authorized to enter this page
    this.authenticationService.currentUser.subscribe(u => {
      this.currentUser = u;
      if(!u || u.role !== Role.User){
        this.router.navigate(["/"]);
      }
    });
   }



  ngOnInit() {
    //* gets all favorites from user and loads them in
    this.favorieteService.getAllFavoritesFromUserId(this.currentUser.id).subscribe( (data) => {

      this.offerList = this.mapJSONToModel(data);
      this.loader(this.offerList);
    });
  }


  loader(x)
   {
      //Loading
      if(x.length !== 0)
      {
        this.loading = false;
      }
      else
      {
        this.loading = false;
        this.error = true;
      }
   }

   //* callback function to remove removed favorite from list
  removeEvent(favorite: Favoriet){

    setTimeout( () => this.offerList = this.offerList.filter(o => o !== favorite), 1000);
  }

  mapJSONToModel(data) : any[] {
    var list: Favoriet[] = [];
    data.forEach(f => {
      var vacature = new Vacature(f.vacature);
      var favoriet = new Favoriet(f.id, new Vacature(vacature));
      list.push(favoriet);
    });

    return list;
  }


}
