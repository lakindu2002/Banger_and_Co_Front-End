import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.css']
})
export class PageNotFoundComponent implements OnInit {

  errorMessage: string = "";

  constructor(private location : Location) { }

  ngOnInit(): void {
    this.errorMessage = "The Page You Requested Cannot Be Found";
  }

  navigateBack() {
    this.location.back();
  }

}
