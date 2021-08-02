import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Rental } from 'src/app/models/rental.model';

@Component({
  selector: 'app-loaded-rental-section',
  templateUrl: './loaded-rental-section.component.html',
  styleUrls: ['./loaded-rental-section.component.css']
})
export class LoadedRentalSectionComponent implements OnInit {

  @Input("loadedRentalList") rentalList: Rental[];
  @Input("loadingRentalType") rentalType: string = "";

  constructor() { }

  ngOnInit(): void {
  }
}
