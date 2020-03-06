import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@/_services';
import { FavoritesService } from '@/_services/Favorites/favorites.service';
import { User, Role } from '@/_models';
import { VacatureService } from '@/_services/Vacature/vacature.service';
import { Favoriet } from '@/_models/favoriet';
import { Vacature } from '@/_models/vacature';
import { StudieGebied } from '@/Model/StudieGebied';

@Component({
  selector: 'app-vactures',
  templateUrl: './vactures.component.html',
  styleUrls: ['./vactures.component.scss']
})
export class VacturesComponent implements OnInit {

  currentUser: User;
  vacatures: Favoriet[] = [];
  favorites: Favoriet[] = [];
  favoriteError = "liking and unliking offers will not be saved unless you login";
  items : any[] = [];
  pageOfItems: Array<any>;
  
  constructor(private authenticationService : AuthenticationService,
              private vacatureService: VacatureService, private favoriteService: FavoritesService ) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  fillVacatures(){
    this.vacatures = [];
    console.log("filling");
    console.log(this.currentUser.role);
    console.log(Role.Company);
    if(this.currentUser != null && this.currentUser.role == Role.User){
      this.favoriteService.getAllFavoritesFromUserId(this.currentUser.id).subscribe(f => {
       this.favorites = f;
       f.forEach(element => this.vacatures.push(new Favoriet(element.id, element.vacature)));
        this.vacatureService.getAllVacatures().subscribe(v => {
          v.forEach(element => {
            if(!this.checkIfVacatureAlreadyExists(element)){
              this.vacatures.push(new Favoriet(null, element));
            }
          });
          this.items = [];
        this.items = this.vacatures;
        });
        
     
     });
      
     
      }
      else{
       this.vacatureService.getAllVacatures().subscribe(v => {
     v.forEach(element => {
       
         this.vacatures.push(new Favoriet(null, element));

     });
     this.items = [];
     this.items = this.vacatures;
     console.log(this.items);
   });
     }
  }

  onChangePage(pageOfItems: Array<any>){
    //update current page of items
    this.pageOfItems = pageOfItems;
  }

  ngOnInit() {
    this.fillVacatures();
     
  }

  filterVacatures(filterArr){
    this.vacatureService.filterVacatures(filterArr).subscribe(vacatures => {
      
      this.vacatures = [];
    for(let i=0; i<vacatures.length;i++){
      if(this.favorites.length > 0){
        let inFavorites = null;
        for(let j=0; j< this.favorites.length; j++){
          if(vacatures[i].id===this.favorites[j].vacature.id){
            inFavorites = this.favorites[j];
          }

        }

        if(inFavorites){
          this.vacatures.push(inFavorites);
        }else{
          this.vacatures.push(new Favoriet(null, vacatures[i]));
        }
      
      }else{
        this.vacatures.push(new Favoriet(null, vacatures[i]));
      }
      
    }
    this.items = this.vacatures;
  });
  }



  handleFilter(filterArr){
    if(filterArr === null){
      this.fillVacatures();
    }else{
    if(this.currentUser != null){
      this.favoriteService.getAllFavoritesFromUserId(this.currentUser.id).subscribe(f => {
        this.favorites = f;
        this.filterVacatures(filterArr);

      })
    }else{
      this.filterVacatures(filterArr);
    }
  }
    
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