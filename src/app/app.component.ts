import { Component } from '@angular/core';
import { StudieService } from "./Service/studie.service"
import { StudieGebied } from './Model/StudieGebied';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'projectYoungPotentials';

  data : any = [];

  s : any = [];

  constructor(private studieService: StudieService){};

  ngOnInit() {
    this.getData();
    console.log(this.data);
    this.showConfig();
    console.log(this.s)
  }

  getData() : void{
    this.studieService.getData().subscribe(studies => this.data = studies );
  }

  showConfig() {
    this.studieService.getConfigResponse().subscribe(resp => {
      const key = resp.headers.keys();
    })
  }
}
