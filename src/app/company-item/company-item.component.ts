import { Component, OnInit, Input, Output } from '@angular/core';
import { CompanyService } from '@/_services/Company/company.service';
import { Company } from '@/_models';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.scss']
})
export class CompanyItemComponent implements OnInit {

  @Input() company: Company;
  @Output() removeEvent: EventEmitter<Company> = new EventEmitter<Company>();

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
  }
  
  // TODO: Check indien beschrijving correct is.
  /**
   * @description Deze methode zorgt voor het verifiëren van een bedrijf
   */
  verifyCompany() {
    this.companyService.deleteFavorite(this.company.id).subscribe();
    this.removeEvent.emit(this.company);
  }

  /**
   * @description Deze methode zorgt voor het verwijderen van een bedrijf
   */
  unverifyCompany() {
    this.companyService.verifyCompany(this.company.id).subscribe();
  }
}
