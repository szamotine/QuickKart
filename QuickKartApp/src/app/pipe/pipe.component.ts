import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-pipe',
  templateUrl: './pipe.component.html',
  styleUrls: ['./pipe.component.css']
})
export class PipeComponent implements OnInit {

  name: string = "Daniel Jager";
  number: number = 8.567;
  date: Date = new Date();
  customerLayout: boolean = false;
  commonLayout: boolean = false;
  userRole: string | null;
  userName: string | null;

  constructor() {
    this.userRole = sessionStorage.getItem('userRole');
    this.userName = sessionStorage.getItem('userName');
 
    if (this.userRole == "Customer") {
      this.customerLayout = true;
    } else {
      this.commonLayout = true;
    }
  }

  ngOnInit(): void {
  }

}
