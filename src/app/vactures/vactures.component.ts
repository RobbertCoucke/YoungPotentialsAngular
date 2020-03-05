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
  // tslint:disable-next-line: quotemark
  favoriteError = "liking and unliking offers will not be saved unless you login";
  items: any[] = [];
  pageOfItems: Array<any>;
  loading: boolean = true;
  error: boolean =false;
  loadingFilter: boolean = true;

  // tslint:disable-next-line: no-trailing-whitespace
  
  constructor(private authenticationService : AuthenticationService,
              private vacatureService: VacatureService, private favoriteService: FavoritesService ) { 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  // tslint:disable-next-line: one-line
  fillVacatures(){
    this.vacatures= [];
    console.log("filling");
    // tslint:disable-next-line: whitespace
    if(this.currentUser != null && this.currentUser.role === Role.Company){
      this.favoriteService.getAllFavoritesFromUserId(this.currentUser.id).subscribe(f => {
        this.favorites = f;
        f.forEach(element => this.vacatures.push(new Favoriet(element.id, element.vacature)));
        this.vacatureService.getAllVacatures().subscribe(v => {
          v.forEach(element => {
            if(!this.checkIfVacatureAlreadyExists(element)){
              this.vacatures.push(new Favoriet(null, element));
            }
          });
          this.items = this.vacatures;
          this.loadingFilter =true;
        });
        
      });
    }
    else{
      this.vacatureService.getAllVacatures().subscribe(v => {
        v.forEach(element => {
          this.vacatures.push(new Favoriet(null, element));
        });
      this.items = this.vacatures;
      this.loadingFilter =true;
      });
    }
  }

  onChangePage(pageOfItems: Array<any>){
    console.log("On change page vacature")
    console.log(pageOfItems)
    //update current page of items
    this.pageOfItems = pageOfItems;
    //If page of vacatures is loaded
    if(pageOfItems.length != 0)
    {
      this.error=false;
      this.onLoad();
    }
    else
    {
      if(this.loading!=true)
      {
        this.error=true;
      }
    }
  }

  //loader
  onLoad() {
    this.loading = false;
    console.log("Load van de vacatures")
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
    console.log("FILTER: ")
    console.log(this.items)

    if(this.items.length == 0)
    {
      this.loading = false;
      this.error = true;
    }
    else
    {
      this.loadingFilter = true;
    }
  });
  }



  handleFilter(filterArr){
    console.log("Handling filter");

    this.loadingFilter=false;
    this.error=false;
    this.loading = true;

    if(filterArr === null){
      this.fillVacatures();
    }else{
    if(this.currentUser != null){
      this.favoriteService.getAllFavoritesFromUserId(this.currentUser.id).subscribe(f => {
        this.favorites = f;
        this.filterVacatures(filterArr);
      });
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