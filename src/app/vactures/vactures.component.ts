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
  favoriteError = "liking and unliking offers will not be saved unless you login as a Student";
  items: any[] = [];
  pageOfItems: Array<any>;

  /*
   * Veld die bijhoudt indien de loading image moet worden getoond, hij start op true zodat wanneer de pagina inlaadt
   * de load image wordt getoond totdat alle vacatures zijn ingeladen.
  */
  loading: boolean = true;
  //Houdt bij wanneer de vacatures moeten getoond worden, indien er geen vacatures zijn wordt een foutmelding getoond.
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
    if(this.currentUser != null && this.currentUser.role === Role.User){
      this.favoriteService.getAllFavoritesFromUserId(this.currentUser.id).subscribe(f => {
        this.favorites = f;
        f.forEach(element => this.vacatures.push(new Favoriet(element.id, element.vacature)));
        this.vacatureService.getAllVacatures().subscribe(v => {
          v.forEach(element => {
            if(!this.checkIfVacatureAlreadyExists(element)){
              this.vacatures.push(new Favoriet(null, element));
            }
          });

          //Alle vacatures worden in de variabele items gekopieerd omdat deze wordt gebruikt bij het pagineren.
          this.items = this.vacatures;
          //Indien alle vacatures geladen zijn word de div waarin de vacatures zitten zichtbaar gemaakt.
          this.loadingFilter =true;
        }); 
      });
    }
    else{
      this.vacatureService.getAllVacatures().subscribe(v => {
        v.forEach(element => {
          this.vacatures.push(new Favoriet(null, element));
        });
      //Alle vacatures worden in de variabele items gekopieerd omdat deze wordt gebruikt bij het pagineren.
      this.items = this.vacatures;
      //Indien alle vacatures geladen zijn word de div waarin de vacatures zitten zichtbaar gemaakt.
      this.loadingFilter =true;
      });
    }
  }

  /**
   * @description Deze functie zorgt voor de vacatures op te delen in pagina's.
   * @param pageOfItems De items de moeten gepagineerd worden.
   */
  onChangePage(pageOfItems: Array<any>){
    //update current page of items
    this.pageOfItems = pageOfItems;

    //Controle indien pageOfItems niet leeg is.
    if(pageOfItems.length !== 0)
    {
      //Indien niet leeg, afbeelden van de lijst met vacatures.
      this.loadingFilter = true;
      //Verbergen van de loader image.
      this.loading = false;
    }
    else
    {
      //Indien leeg, controleren als er nog wordt geladen
      if(this.loading !== true)
      {
        //Indien het laden klaar is, wordt een foutmelding getoond dat er geen vacatures zijn.
        this.loadingFilter = false;
      }
    }
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
    //Alle vacatures worden in de variabele items gekopieerd omdat deze wordt gebruikt bij het pagineren.
    this.items = this.vacatures;

    //Controle om te checken als items leeg is.
    if(this.items.length == 0)
    {
      //Indien leeg, wordt loader image verborgen en wordt er een foutmelding getoond dat er geen vacatures zijn.
      this.loading = false;
      this.loadingFilter = false;
    }
    else
    {
      //Indien niet leeg wordt de lijst van vacatures afgebeeld.
      this.loadingFilter = true;
    }
  });
  }



  handleFilter(filterArr){
    //Indien een filter wordt aangeklikt wordt de lijst met vacatures onzichtbaar gemaakt.
    this.loadingFilter = false;
    //De load image wordt getoond wanneer een filter wordt aangeklikt.
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