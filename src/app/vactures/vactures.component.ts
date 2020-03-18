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
  @ViewChild('vacaturewrapper', { read: ElementRef, static: false }) elementView: ElementRef;

  viewHeight: number;

  currentUser: User;
  vacatures: Favoriet[] = [];
  favorites: Favoriet[] = [];
  favoriteError = "liking and unliking offers will not be saved unless you login as a Student";
  items: any[] = [];
  pageOfItems: Array<any>;

  /*
   * Veld die bijhoudt indien de loading image moet worden getoond, hij start op true zodat wanneer de pagina inlaadt
   * de load image wordt getoond totdat alle vacatures zijn ingeladen.
  */
  loading: boolean = true;
  // Houdt bij wanneer de vacatures moeten getoond worden, indien er geen vacatures zijn wordt een foutmelding getoond.
  loadingFilter: boolean = true;
  // Sorting
  selectedSorting: string = 'dateDescend';

  constructor(private authenticationService: AuthenticationService,
    private vacatureService: VacatureService, private favoriteService: FavoritesService, private pagingService: PagingService) {
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  /**
   * @description Deze methode zorgt voor het inladen van de vacatures
   */
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
          //Alle vacatures worden in de variabele items gekopieerd omdat deze wordt gebruikt bij het pagineren.
          this.items = this.vacatures;

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
        //Alle vacatures worden in de variabele items gekopieerd omdat deze wordt gebruikt bij het pagineren.
        this.items = this.vacatures;
        //Indien alle vacatures geladen zijn word de div waarin de vacatures zitten zichtbaar gemaakt.
        this.loadingFilter = true;
      });
    }
  }

  /**
   * TODO: Hier is er nog een bug, de bug is er doordat de vacatures pas achteraf ingeladen wordt waardoor de height verkeerd is
   * @description Slaat de height van de vacaturecomponent op in de @param viewHeight
   */
  setHeight() {
    this.viewHeight = this.elementView.nativeElement.offsetHeight;
  }

  /**
   * @description Controleert welke sorteermethode is geselecteerd en roept daarna de correcte methode aan.
   */
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

  /**
   * @description Sorteermethode datum aflopend (Van recent naar oud)
   * @param vac1 Vacature 1 die moet vergeleken worden met Vacature 2
   * @param vac2 Vacature 2 die moet vergeleken worden met Vacature 1
   * @returns het verschil van de twee data
   */
  compareDesc(vac1, vac2) {
    let date1 = new Date(vac1.vacature.created).getTime();
    let date2 = new Date(vac2.vacature.created).getTime();
    return date2 - date1;
  }

  /**
   * @description Sorteermethode datum oplopend (Van oud naar nieuw)
   * @param vac1 Vacature 1 die moet vergeleken worden met Vacature 2
   * @param vac2 Vacature 2 die moet vergeleken worden met Vacature 1
   * @returns het verschil van de twee data
   */
  compareAsc(vac1, vac2) {
    let date1 = new Date(vac1.vacature.created).getTime();
    let date2 = new Date(vac2.vacature.created).getTime();
    return date1 - date2;
  }

  /**
   * @description Sorteert de gegevens en reload het paging component met de gesorteerde data.
   */
  sortingChange() {
    this.sortFunction();
    // De methode hieronder werkt nog niet optimaal
    // this.firstPage();
    // Niet de mooiste oplossing, want werkt niet als je op een andere pagina bevindt
    this.onChangePage(this.items.slice(0, 10));
  }

  /**
   * TODO: Deze functie bevat nog een bug waardoor de sorting niet meer werkt,
   * geen idee waarom de sorting niet meer werkt na het filteren.
   * @description Zet de pagina op bladzijde 1
   */
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
    this.setHeight();
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

  /**
   * @description Aan de hand van de parameters de vacatures filteren
   * @param filterArr een Array met alle geselecteerde studiegebieden
   * @param typeArr een Array met alle geselecteerde types
   */
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
      // Alle vacatures worden in de variabele items gekopieerd omdat deze wordt gebruikt bij het pagineren.
      this.items = this.vacatures;

      // Controle om te checken als items leeg is.
      if (this.items.length == 0) {
        // Indien leeg, wordt loader image verborgen en wordt er een foutmelding getoond dat er geen vacatures zijn.
        this.loading = false;
        this.loadingFilter = false;
      }
      else {
        // Indien niet leeg wordt de lijst van vacatures afgebeeld.
        this.loadingFilter = true;
      }
    });
  }

  /**
   * @description Behandelt de filter logica
   * @param filters Alle aangevinkte filters
   */
  handleFilter(filters) {
    var filterArr = filters.filter;
    var typeArr = filters.types;

    // Indien een filter wordt aangeklikt wordt de lijst met vacatures onzichtbaar gemaakt.
    this.loadingFilter = false;

    // De load image wordt getoond wanneer een filter wordt aangeklikt.
    this.loading = true;

    if (filterArr === null && typeArr === null) {
      // Indien geen filters zijn aangekruist dan worden alle vacatures getoond
      this.fillVacatures();
    } else {
      if (this.currentUser != null && this.currentUser.role === 'User') {
        // Alle favoriet vacatures ophalen en in variabele opslaan en methode filterVacatures aanroepen
        this.favoriteService.getAllFavoritesFromUserId(this.currentUser.id).subscribe(f => {
          this.favorites = f;
          this.filterVacatures(filterArr, typeArr);
        });
      } else {
        // Methode filterVacatures aanroepen
        this.filterVacatures(filterArr, typeArr);
      }
    }

  }

  /**
   * @description moet hier niet uit lijst verwijderen, echte implementatie zit in favorietencompenent.
   * moet deze methode wel meegeven anders gaat hij errors geven  --> opzoeken
   * hoe je kan checken in het vacature-item of de parent-function (evenEmitter) meegegeven is of niet.
   * @param favorite
   */
  removeEventAbstract(favorite: Favoriet) {
    // Methode niet verwijderen anders error
  }

  /**
   * @description Controleert indien vacature bestaat
   * @param vacature de vacature die gecontroleerd moet worden indien hij bestaat.
   */
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
}
