import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { ScrapeReturn } from 'src/app/models/scraper.model';

@Component({
  selector: 'app-vehicle-type-card-info',
  templateUrl: './type-card-info.component.html',
  styleUrls: ['./type-card-info.component.css']
})
export class VehicleTypeCardInfoComponent implements OnInit {

  @Input('eachType') eachType: ScrapeReturn;
  @Output('loadVehicleForType') emitter: EventEmitter<ScrapeReturn> = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  cardClicked() {
    this.emitter.emit(this.eachType);
  }
}
