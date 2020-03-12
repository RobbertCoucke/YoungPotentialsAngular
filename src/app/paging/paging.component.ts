import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { __importDefault } from 'tslib';

import paginate from 'jw-paginate';

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

  ngOnInit() {
    // set page if items array isn't empty
    if (this.items && this.items.length) {
      console.log("TEST PAGING")
      this.setPage(this.initialPage);
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    // reset page if items array has changed
    if (changes.items.currentValue !== changes.items.previousValue) {
      this.setPage(this.initialPage);
    }
  }

  private setPage(page: number) {
    // get new pager object for specified page
    this.pager = paginate(this.items.length, page, this.pageSize, this.maxPages);

    // get new page of items from items array
    var pageOfItems = this.items.slice(this.pager.startIndex, this.pager.endIndex + 1);
    console.log("setPage");
    console.log(this.pager.startIndex);
    console.log(this.pager.endIndex);
    // call change page function in parent component
    this.changePage.emit(pageOfItems);
  }

  
}
