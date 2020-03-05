import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@/_services';
import { FavoritesService } from '@/_services/Favorites/favorites.service';
import { User } from '@/_models';
import { VacatureService } from '@/_services/Vacature/vacature.service';
import { Favoriet } from '@/_models/favoriet';
import { Vacature } from '@/_models/vacature';

@Component({
  selector: 'app-vactures',
  templateUrl: './vactures.component.html',
  styleUrls: ['./vactures.component.scss']
})
export class VacturesComponent implements OnInit {
  items: any[] = [];
  currentUser: User;
  pageOfItems: Array<any>;
  vacatures: Favoriet[] = [];
  favorites: Favoriet[] = [];
  favoriteError = "liking and unliking offers will not be saved unless you login";

  loading: boolean = true;
  
  constructor(private authenticationService : AuthenticationService,
              private vacatureService: VacatureService, private favoriteService: FavoritesService ) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  ngOnInit() {
    //this is fucked up code fix this shitty code 
     if(this.currentUser != null){
       this.favoriteService.getAllFavoritesFromUserId(this.currentUser.id).subscribe(f => {
        this.favorites = f;
        f.forEach(element => this.vacatures.push(new Favoriet(element.id, element.vacature)));
         this.vacatureService.getAllVacatures().subscribe(v => {
           v.forEach(element => {
             if(!this.checkIfVacatureAlreadyExists(element)){
               this.vacatures.push(new Favoriet(null, element));
             }
           });
           console.log("Hello :)");
           console.log(this.vacatures);
           this.items = this.vacatures;
         });
      
      });
       
      
       }
       else{
        this.vacatureService.getAllVacatures().subscribe(v => {
      v.forEach(element => {
        if(!this.checkIfVacatureAlreadyExists(element)){
          this.vacatures.push(new Favoriet(null, element));
            }
        });
      this.items = this.vacatures;
      });
      }
  }

  // ChangePage
  onChangePage(pageOfItems: Array<any>) {
    console.log("oncChange PAGE")
    // update current page of items
    this.pageOfItems = pageOfItems;
    //If page of vacatures is loaded
    if(pageOfItems.length != 0)
    {
      this.onLoad();
    }
    console.log(this.pageOfItems);
  }

  //loader
  onLoad() {
    this.loading = false;
    console.log("Load van de vacatures")
  }

  removeEventAbstract(favorite: Favoriet){
      //moet hier niet uit lijst verwijderen, echte implementatie zit in favorietencompenent.
      //moet deze methode wel meegeven anders gaat hij errors geven  --> opzoeken hoe je kan checken in het vacature-item of de parent-function (evenEmitter) meegegeven is of niet.
  }

  private checkIfVacatureAlreadyExists(vacature: Vacature){
    if(this.vacatures){
      for(var i = 0; i<this.favorites.length; i++){
        if(vacature.id === this.favorites[i].vacature.id){
        
          return true;
        }
      }

  }
  
    return false;
  }
  

}
