import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Rental } from 'src/app/models/rental.model';

@Component({
  selector: 'app-rental-table-list',
  templateUrl: './rental-table-list.component.html',
  styleUrls: ['./rental-table-list.component.css']
})
export class RentalTableListComponent implements OnInit {

  @Input("rentalList") rentalList: Rental[];
  @Output("loadMoreClicked") loadMoreEvent: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  loadMoreClicked() {
    this.loadMoreEvent.next(true);
  }
}
