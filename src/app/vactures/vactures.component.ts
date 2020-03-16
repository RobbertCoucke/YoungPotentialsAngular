import { Component, OnInit, HostListener, ViewChild, ElementRef } from '@angular/core';
import { AuthenticationService } from '@/_services';
import { FavoritesService } from '@/_services/Favorites/favorites.service';
import { User, Role } from '@/_models';
import { VacatureService } from '@/_services/Vacature/vacature.service';
import { Favoriet } from '@/_models/favoriet';
import { Vacature } from '@/_models/vacature';
import { StudieGebied } from '@/Model/StudieGebied';
import { PagingService } from '@/_services/Paging/paging.service';

@Component({
  selector: 'app-vactures',
  templateUrl: './vactures.component.html',
  styleUrls: ['./vactures.component.scss']
})
export class VacturesComponent implements OnInit {
  @ViewChild('vacaturewrapper', {read: ElementRef, static: false}) elementView: ElementRef;

  viewHeight: number;
  // isShow: boolean;
  // topPosToStartShowing = 100;

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
  //Sorting
  selectedSorting: string = 'dateDescend';

  // tslint:disable-next-line: no-trailing-whitespace

  constructor(private authenticationService: AuthenticationService,
    private vacatureService: VacatureService, private favoriteService: FavoritesService, private pagingService: PagingService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);

  }

  //   @HostListener('window:scroll')
  //   checkScroll() {

  //     // window의 scroll top
  //     // Both window.pageYOffset and document.documentElement.scrollTop returns the same result in all the cases. window.pageYOffset is not supported below IE 9.

  //     const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

  //     console.log('[scroll]', scrollPosition);

  //     if (scrollPosition >= this.topPosToStartShowing) {
  //       this.isShow = true;
  //     } else {
  //       this.isShow = false;
  //     }
  //   }

  //   scrollTo(className: string):void {
  //     const elementList = document.querySelectorAll('.' + className);
  //     const element = elementList[0] as HTMLElement;
  //     element.scrollIntoView({ behavior: 'smooth' });
  //  }
  // tslint:disable-next-line: one-line
  fillVacatures() {
    this.vacatures = [];

    if (this.currentUser != null && this.currentUser.role == Role.User) {
      this.favoriteService.getAllFavoritesFromUserId(this.currentUser.id).subscribe(f => {
        this.favorites = f;
        f.forEach(element => this.vacatures.push(new Favoriet(element.id, new Vacature(element.vacature))));
        this.vacatureService.getAllVacatures().subscribe(v => {

          v.forEach(element => {
            if (!this.checkIfVacatureAlreadyExists(element)) {
              this.vacatures.push(new Favoriet(null, new Vacature(element)));
            }
          });

          this.sortFunction();
          
          //Indien alle vacatures geladen zijn word de div waarin de vacatures zitten zichtbaar gemaakt.
          this.loadingFilter = true;
        });
      });
    }
    else {
      this.vacatureService.getAllVacatures().subscribe(v => {
        v.forEach(element => {
          this.vacatures.push(new Favoriet(null, new Vacature(element)));
        });

        this.sortFunction();
       
        //Indien alle vacatures geladen zijn word de div waarin de vacatures zitten zichtbaar gemaakt.
        this.loadingFilter = true;
      });
    }
  }
  setHeight(){
    this.viewHeight = this.elementView.nativeElement.offsetHeight;
    console.log("viewHeight")
    console.log(this.viewHeight);
  }
  sortFunction() {
    switch (this.selectedSorting) {
      case 'dateDescend': {
        this.vacatures.sort(this.compareDesc);
        break;
      }
      case 'dateAscend': {
        this.vacatures.sort(this.compareAsc);
        break;
      }
    }
    //Alle vacatures worden in de variabele items gekopieerd omdat deze wordt gebruikt bij het pagineren.
    this.items = this.vacatures;
  }

  compareDesc(vac1, vac2) {
    let date1 = new Date(vac1.vacature.created).getTime();
    let date2 = new Date(vac2.vacature.created).getTime();
    return date2 - date1;
  }
  compareAsc(vac1, vac2) {
    let date1 = new Date(vac1.vacature.created).getTime();
    let date2 = new Date(vac2.vacature.created).getTime();
    return date1 - date2;
  }

  sortingChange() {
    this.sortFunction();
    this.firstPage();
    //this.onChangePage(this.items.slice(0, 10));
  }
  
  firstPage() {
    this.pagingService.setFirstPage(1);
  }

  /**
   * @description Deze functie zorgt voor de vacatures op te delen in pagina's.
   * @param pageOfItems De items die moeten gepagineerd worden.
   */
  onChangePage(pageOfItems: Array<any>) {
    //update current page of items
    this.pageOfItems = pageOfItems;

    console.log("Change Page")
    this.setHeight();
    console.log("Change Page Done")

    //Controle indien pageOfItems niet leeg is.
    if (pageOfItems.length !== 0) {
      //Indien niet leeg, afbeelden van de lijst met vacatures.
      this.loadingFilter = true;
      //Verbergen van de loader image.
      this.loading = false;
    }
    else {
      //Indien leeg, controleren als er nog wordt geladen
      if (this.loading !== true) {
        //Indien het laden klaar is, wordt een foutmelding getoond dat er geen vacatures zijn.
        this.loadingFilter = false;
      }
    }
  }

  ngOnInit() {
    this.fillVacatures();
  }
  ngAfterViewInit(){
    console.log("After view init")
    console.log(this.viewHeight)
    
  }

  filterVacatures(filterArr, typeArr) {
    this.vacatureService.filterVacatures(filterArr, typeArr).subscribe(vacatures => {

      this.vacatures = [];
      for (let i = 0; i < vacatures.length; i++) {
        if (this.favorites.length > 0) {
          let inFavorites = null;
          for (let j = 0; j < this.favorites.length; j++) {
            if (vacatures[i].id === this.favorites[j].vacature.id) {
              inFavorites = this.favorites[j];
            }
          }
          if (inFavorites) {
            this.vacatures.push(new Favoriet(inFavorites.id, new Vacature(inFavorites.vacature)));
          } else {
            this.vacatures.push(new Favoriet(null, new Vacature(vacatures[i])));
          }

        } else {
          this.vacatures.push(new Favoriet(null, new Vacature(vacatures[i])));
        }

      }

      this.sortFunction();
      //Controle om te checken als items leeg is.
      if (this.items.length == 0) {
        //Indien leeg, wordt loader image verborgen en wordt er een foutmelding getoond dat er geen vacatures zijn.
        this.loading = false;
        this.loadingFilter = false;
      }
      else {
        //Indien niet leeg wordt de lijst van vacatures afgebeeld.
        this.loadingFilter = true;
      }
    });
  }



  handleFilter(filters) {
    var filterArr = filters.filter;
    var typeArr = filters.types;
    //Indien een filter wordt aangeklikt wordt de lijst met vacatures onzichtbaar gemaakt.
    this.loadingFilter = false;
    //De load image wordt getoond wanneer een filter wordt aangeklikt.
    this.loading = true;

    if (filterArr === null && typeArr === null) {
      this.fillVacatures();
    } else {
      if (this.currentUser != null) {
        this.favoriteService.getAllFavoritesFromUserId(this.currentUser.id).subscribe(f => {
          this.favorites = f;
          this.filterVacatures(filterArr, typeArr);
        });
      } else {
        this.filterVacatures(filterArr, typeArr);
      }
    }

  }

  removeEventAbstract(favorite: Favoriet) {
    //moet hier niet uit lijst verwijderen, echte implementatie zit in favorietencompenent.
    //moet deze methode wel meegeven anders gaat hij errors geven  --> opzoeken hoe je kan checken in het vacature-item of de parent-function (evenEmitter) meegegeven is of niet.
  }

  private checkIfVacatureAlreadyExists(vacature: Vacature) {
    if (this.vacatures) {
      for (var i = 0; i < this.favorites.length; i++) {
        if (vacature.id === this.favorites[i].vacature.id) {

          return true;
        }
      }

    }

    return false;
  }

  //   scroll(el: HTMLElement) {
  //     el.scrollIntoView();
  // }

}