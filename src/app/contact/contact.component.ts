import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(){
    console.log('TEST')
    document.getElementsByClassName('map-wrap')[0].addEventListener("click",function(){
      document.getElementById('google-map').classList.add('clicked');
      console.log('click')
    });

    document.getElementsByClassName('map-wrap')[0].addEventListener("mouseleave",function(){
      document.getElementById('google-map').classList.remove('clicked');
      console.log('click remove')
    });
    //$(this).find('iframe').removeClass('clicked')}));
  }

}
