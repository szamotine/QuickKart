import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer-layout',
  templateUrl: './customer-layout.component.html',
  styleUrls: ['./customer-layout.component.css']
})
export class CustomerLayoutComponent implements OnInit {
  userRole: string | null;

  constructor(private router: Router) {
    this.userRole = sessionStorage.getItem('userRole');
  }

  ngOnInit() {
  }

  logOut() {
    sessionStorage.removeItem('userName');
    sessionStorage.removeItem('userRole');
    this.router.navigate(['']);
  }

}
