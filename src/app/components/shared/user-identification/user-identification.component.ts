import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-identification',
  templateUrl: './user-identification.component.html',
  styleUrls: ['./user-identification.component.css']
})
export class UserIdentificationComponent implements OnInit {

  @Input("imageToLoad") image: string;
  @Input("imageAlt") info: string;

  constructor() { }

  ngOnInit(): void {
  }

}
