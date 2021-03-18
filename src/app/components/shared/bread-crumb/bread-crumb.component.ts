import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-bread-crumb',
  templateUrl: './bread-crumb.component.html',
  styleUrls: ['./bread-crumb.component.css']
})
export class BreadCrumbComponent implements OnInit {

  @Input("pageName") pageName: string;

  constructor(private location : Location) { }

  ngOnInit(): void {
  }

  goBack(){
    this.location.back();
  }

}
