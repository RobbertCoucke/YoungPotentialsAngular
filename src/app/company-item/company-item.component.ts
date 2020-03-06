import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from '@/_services/Company/company.service';
import { Company } from '@/_models';

@Component({
  selector: 'app-company-item',
  templateUrl: './company-item.component.html',
  styleUrls: ['./company-item.component.scss']
})
export class CompanyItemComponent implements OnInit {

  @Input() company: Company;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
  }


  verifyCompany(){
    this.companyService.verifyCompany(this.company.id).subscribe();
 }

 unverifyCompany(){
    this.companyService.verifyCompany(this.company.id).subscribe();
 }

}
