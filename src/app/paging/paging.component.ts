import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { __importDefault } from 'tslib';

import paginate from 'jw-paginate';
import { PagingService } from '@/_services/Paging/paging.service';

// Had een error, gefixt via onderstaande code (zie https://stackoverflow.com/questions/56238356/understanding-esmoduleinterop-in-tsconfig-file/56348146#56348146)
// transpiled js with esModuleInterop (simplified):
// const paginate = __importDefault(require('jw-paginate'));
// paginate.default();

@Component({
  selector: 'app-paging',
  templateUrl: './paging.component.html',
  styleUrls: ['./paging.component.scss']
})

export class PagingComponent implements OnInit, OnChanges {
  @Input() items: Array<any>;
  @Output() changePage = new EventEmitter<any>(true);
  @Input() initialPage = 1;
  @Input() pageSize = 10;
  @Input() maxPages = 5;

  pager: any = {};

  constructor(private pagingService: PagingService) { }

  ngOnInit() {
    // set page if items array isn't empty
    if (this.items && this.items.length) {
      this.setPage(this.initialPage);
    }
    if (this.pagingService.subsVar === undefined) {    
      this.pagingService.subsVar = this.pagingService.setFirstPageFunction.subscribe((number:number) => {    
        this.setPage(number);
      });    
    }  
  }

  ngOnChanges(changes: SimpleChanges) {
    // reset page if items array has changed
    if (changes.items.currentValue !== changes.items.previousValue) {
      this.setPage(this.initialPage);
    }
  }

  setPage(page: number) {
    // get new pager object for specified page
    this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages);
    
    // get new page of items from items array
    var pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log(pageOfItems);
    // call change page function in parent component
    this.changePage.emit(pageOfItems);
  }

  
}
