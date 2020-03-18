import { url } from "inspector";
import {
  Component,
  OnInit,
  ViewChild,
  EventEmitter,
  Input
} from "@angular/core";
import { User, Role, Type, Company } from "@/_models";
import { AuthenticationService } from "@/_services";
import { Router, UrlSerializer } from "@angular/router";
import { VacatureService } from "@/_services/Vacature/vacature.service";
import { CompanyService } from "@/_services/Company/company.service";
import { ItemsList } from "@ng-select/ng-select/lib/items-list";
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
  selector: "app-unverified-table",
  templateUrl: "./unverified-table.component.html",
  styleUrls: ["./unverified-table.component.scss"]
})
export class UnverifiedTableComponent implements OnInit {

  currentUser: User; //veld voor huidig ingelogde gebruiker
  companies: any[] = []; //array om bedrijven uit database in op te slaan
  error: boolean = false; // true als er een error optreedt
  dataSource: any; // data die in tabel wordt geladen

  isLoading: boolean = true; //true zo lang data wordt geladen uit db (voor matspinner)

  Selectedcompanies: any[] = []; // lijst met geselecteerde bedrijven

  //kolommen die in tabel worden weergegeven
  displayedColumns: string[] = [
    "select",
    "position",
    "companyName",
    "address",
    "url",
    "action",
  ];

  selection = new SelectionModel<BedrijfList>(true, []); // houdt de aangevinkte checkboxes bij

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private authenticationService: AuthenticationService,
    private companyService: CompanyService,
    private router: Router
  ) {
    this.authenticationService.currentUser.subscribe(u => {
      this.currentUser = u;
      
    });

    this.fetchData();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {}
  ngAfterViewInit() {}

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: BedrijfList): string {
    if (!row) {
      return `${this.isAllSelected() ? "select" : "deselect"} all`;
    }
    return `${
      this.selection.isSelected(row) ? "deselect" : "select"
    } row ${row.position + 1}`;
  }

  unverifyCompany() {
    this.Selectedcompanies = this.selection.selected;
    this.Selectedcompanies.forEach(element => {
      console.log(element.id);
      console.log("verwijderen");
      this.companyService.deleteCompany(element.id).subscribe();
    });
  }

  unverifyCompanyEnkel(objectID) {
    console.log("verwijdern:");
    console.log(objectID);
    this.companyService.deleteCompany(objectID).subscribe();
  }

  verifyCompanyEnkel(objectID) {
    console.log("verifiëren:");
    console.log(objectID);
    this.companyService.verifyCompany(objectID).subscribe();
  }

  verifyCompany() {
    this.Selectedcompanies = this.selection.selected;
    console.log("test");
    console.log(this.Selectedcompanies);
    this.Selectedcompanies.forEach(element => {
      console.log("verifiëren:");
      console.log(element.id);
      this.companyService.verifyCompany(element.id).subscribe(data => {
        console.log("in subscribe");
        console.log(element.id);
      });

      console.log("geverifieerd");
      console.log("fetching new data:");
      this.fetchData();
    });
  }

  fetchData() {
    this.companyService.getAllUnverifiedCompanies().subscribe(c => {
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
    error => this.isLoading = false
  }
}
