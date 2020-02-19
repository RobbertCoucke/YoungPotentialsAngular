import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vacture-item',
  templateUrl: './vacture-item.component.html',
  styleUrls: ['./vacture-item.component.scss']
})
export class VactureItemComponent implements OnInit {
  liked = false;

  constructor() { }

  ngOnInit(): void {
  }

  onLike(){
    if(this.liked)
    {
      this.liked = false;
    }else{
      this.liked = true;
    }
    console.log(this.liked);
  }

}
