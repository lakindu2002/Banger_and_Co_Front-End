import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ScrapeReturn } from 'src/app/models/scraper.model';

@Component({
  selector: 'app-vehicle-list-type',
  templateUrl: './vehicle-list-type.component.html',
  styleUrls: ['./vehicle-list-type.component.css']
})
export class VehicleListTypeComponent implements OnInit {

  @Input("detailedInfo") detailedScrape: ScrapeReturn;
  @Output("backClicked") backClicked: EventEmitter<boolean> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  backClick() {
    this.backClicked.next(true);
  }

}
