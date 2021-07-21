import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-section-header',
  templateUrl: './section-header.component.html',
  styleUrls: ['./section-header.component.css']
})
export class SectionHeaderComponent implements OnInit {

  @Input("sectionText") inputText: string = "";
  @Output("filterTriggered") filteredTriggered: EventEmitter<string> = new EventEmitter();

  searchTerm: string = "";

  constructor() { }

  ngOnInit(): void {
  }

  filterViaVehicleName() {
    this.filteredTriggered.emit(this.searchTerm);
  }

}
