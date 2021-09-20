import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.css']
})
export class SectionHeaderComponent implements OnInit {

  @Input("sectionText") inputText: string = "";
  @Input("totalCaption") totalCaption: string = "";

  @Output("filterTriggered") filteredTriggered: EventEmitter<string> = new EventEmitter();
  @Output("customerNameFilter") customerNameFilter: EventEmitter<string> = new EventEmitter();

  searchTerm: string = "";
  customerNameTerm: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  filterViaVehicleName() {
    //when vehicle name changes, set the customer name to empty string
    this.customerNameTerm = "";
    this.filteredTriggered.emit(this.searchTerm.trim());
  }

  filterViaCustomerName() {
    //when user is searching for vehicles, empty the customer name field
    this.searchTerm = "";
    this.customerNameFilter.emit(this.customerNameTerm.trim());
  }

}
