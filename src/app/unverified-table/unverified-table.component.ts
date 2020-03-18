/**
 * ! Voor de tabel maken we gebruik van de material Angular Table
 * ! zie documentatie op: https://material.angular.io/components/table/overview
 */

import { Component, ViewChild } from "@angular/core";
import { User, Role } from "@/_models";
import { AuthenticationService } from "@/_services";
import { CompanyService } from "@/_services/Company/company.service";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";
import { Router } from "@angular/router";

/**
 * * Interface voor de velden die we willen weergeven in tabel
 */
export interface BedrijfList {
  companyName: string;
  address: string;
  url: string;
  position: any;
}

@Component({
  selector: "app-unverified-table",
  templateUrl: "./unverified-table.component.html",
  styleUrls: ["./unverified-table.component.scss"]
})
export class UnverifiedTableComponent {
  currentUser: User; // veld voor huidig ingelogde gebruiker
  companies: any[] = []; //array om bedrijven uit database in op te slaan
  error: boolean = false; // true als er een error optreedt
  dataSource: any; // data die in tabel wordt geladen
  isLoading: boolean = true; // true zo lang data wordt geladen uit db (voor matspinner)
  Selectedcompanies: any[] = []; // lijst met geselecteerde bedrijven

  // kolommen die in tabel worden weergegeven
  displayedColumns: string[] = [
    "select",
    "position",
    "companyName",
    "address",
    "url",
    "action"
  ];

  selection = new SelectionModel<BedrijfList>(true, []); // houdt de aangevinkte checkboxes bij

  // met viewchild maken we een reference naar de MatPaginator & MatSort in de html
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private authenticationService: AuthenticationService,
    private companyService: CompanyService,
    private router: Router
  ) {
    this.authenticationService.currentUser.subscribe(u => {
      this.currentUser = u; //ophalen huidig ingelogde gebruiker
      //als ingelogde gebruiker geen admin is worden ze geredirect naar de homepage
      console.log(this.currentUser)
      if ( !this.currentUser || this.currentUser.role !== Role.Admin) {
        this.router.navigate(["/"]);
      }

    });
    this.fetchData(); //inladen data voor tabel
  }

  /**
   * @param event wanneer een waarde komt in filter
   * @description filtert de tabel op basis van de user input
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  /**
   * @description controleert of het aantal geselecteerde elementen gelijk is aan het totaal aantal rijen
   * @returns een boolean met true indien gelijk
   */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /**
   * @description selecteert alle rijen als ze niet zijn geselecteerd; anders wordt de selectie gewist
   */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /**
   * @param row aantal rijen volgens bedrijfList interface
   * @description maakt een label voor elke rij in de tabel
   * @returns een checkbox per rij
   */
  checkboxLabel(row?: BedrijfList): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
    } row ${row.position + 1}`;
  }

  /**
   * @description verwijdert alle bedrijven waarvan de checkbox is aangevinkt
   * haalt geselecteerde rijen op via: this.selection.selected
   * array wordt dan doorlopen en geeft telkens bedrijfid mee in de deleteCompany service methode
   */
  unverifyCompany() {
    this.Selectedcompanies = this.selection.selected;
    this.Selectedcompanies.forEach(element => {
      this.companyService.deleteCompany(element.id).subscribe();
    });
  }

  /**
   * @param objectID id van geselecteerde element
   * @description verwijdert een individueel bedrijf
   */
  unverifyCompanyEnkel(objectID) {
    this.companyService.deleteCompany(objectID).subscribe();
  }

  /**
   * @param objectID id van geselecteerde element
   * @description verifieert een invidueel bedrijf
   */
  verifyCompanyEnkel(objectID) {
    this.companyService.verifyCompany(objectID).subscribe();
  }

  /**
   * @description verifieert alle bedrijven waarvan de checkbox is aangevinkt
   * haalt geselecteerde rijen op via: this.selection.selected
   * array wordt dan doorlopen en geeft telkens bedrijfid mee in de deleteCompany service methode
   */
  verifyCompany() {
    this.Selectedcompanies = this.selection.selected;
    this.Selectedcompanies.forEach(element => {
      this.companyService.verifyCompany(element.id).subscribe(data => {});
    });
  }

  /**
   * @description laadt de data uit de database in een nieuwe array: dataSource
   * We stoppen hierin alle bedrijven die nog geverifieerd moeten worden
   * Er wordt ook een nieuwe rij met posititie toegevoegd, deze is nodig voor de sorting
   */
  fetchData() {
    this.companyService.getAllUnverifiedCompanies().subscribe(c => {
      //toevoegen rij met positie
      for (let index = 0; index < c.length; index++) {
        const positie = c[index];
        c[index].position = index + 1;
        this.companies.push(c[index]);
      }
      this.dataSource = new MatTableDataSource<BedrijfList>(this.companies); //stopt array met bedrijven in de datasource
      this.dataSource.paginator = this.paginator; //geeft data aan de MatPaginator
      this.dataSource.sort = this.sort; //geeft data aan de MatSort
      this.isLoading = false; // na het inladen van de gegevens stoppen we de loader
    });
    error => (this.isLoading = false); //als er een error optreed stoppen we de loader ook
  }
}
