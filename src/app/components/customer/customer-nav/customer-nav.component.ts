import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';

@Component({
  selector: 'app-customer-nav',
  templateUrl: './customer-nav.component.html',
  styleUrls: ['./customer-nav.component.css'],
  //used to provide animations for the drop down directive of ngx-bootstrap
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }],
})
export class CustomerNavComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
