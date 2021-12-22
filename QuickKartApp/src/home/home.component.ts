import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'home',
    templateUrl: './home.component.html'
})

export class HomeComponent implements OnInit {

  imgSrc: string;
  userRole: string | null;
  customerLayout: boolean = false;
  commonLayout: boolean = false;

  constructor() {
    this.imgSrc = './assets/quickKart-images/quickKart.png';
    this.userRole = sessionStorage.getItem('userRole');

    if (this.userRole == "Customer") {
      this.customerLayout = true;
    } else {
      this.commonLayout = true;
    }
  }

  ngOnInit()
  {
    this.imgSrc = './assets/quickKart-images/quickKart.png';
  }
  
}
