/**
 * ! Voor de tabel maken we gebruik van de material Angular Table
 * ! zie documentatie op: https://material.angular.io/components/table/overview
 */

import { Component, ViewChild } from "@angular/core";
import { User, Role } from "@/_models";
import { AuthenticationService } from "@/_services";
import { Router } from "@angular/router";
import { CompanyService } from "@/_services/Company/company.service";
import { MatTableDataSource, MatPaginator } from "@angular/material";
import { MatSort } from "@angular/material/sort";
import { SelectionModel } from "@angular/cdk/collections";


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
  selector: "app-verified-table",
  templateUrl: "./verified-table.component.html",
  styleUrls: ["./verified-table.component.scss"]
})
export class VerifiedTableComponent {
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
      if (this.currentUser && this.currentUser.role !== Role.Admin) {
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
    this.Selectedcompanies.forEach((element,index) => {
      if(index === this.Selectedcompanies.length -1){
        this.companyService.deleteCompany(element.id).subscribe( data => {
          this.clearTable();
        });
      }else{
        this.companyService.deleteCompany(element.id).subscribe();
      }
      
    });
  }

  /**
   * @param objectID id van geselecteerde element
   * @description verwijdert een individueel bedrijf
   */
  unverifyCompanyEnkel(objectID) {
    console.log("verwijdern:");
    console.log(objectID);
    this.companyService.deleteCompany(objectID).subscribe(data => {
      this.clearTable();
    });
  }

  clearTable(){
    this.Selectedcompanies = [];
    this.fetchData();
  }

  /**
   * @description laadt de data uit de database in een nieuwe array: dataSource
   * We stoppen hierin alle bedrijven die al geverifieerd werden
   * Er wordt ook een nieuwe rij met posititie toegevoegd, deze is nodig voor de sorting
   */
  fetchData() {
    this.companies = [];
    this.companyService.getAllVerifiedCompanies().subscribe(c => {
      for (let index = 0; index < c.length; index++) {
        const positie = c[index];
        c[index].position = index + 1;
        this.companies.push(c[index]);
      }
      this.dataSource = new MatTableDataSource<BedrijfList>(this.companies);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.isLoading = false;
    });
    error => (this.isLoading = false);
  }
}
