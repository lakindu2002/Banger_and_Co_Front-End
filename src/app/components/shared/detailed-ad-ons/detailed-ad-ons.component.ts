import { Component, Input, OnInit } from '@angular/core';
import { AdditionalEquipment } from 'src/app/models/equipment.model';

@Component({
  selector: 'app-detailed-ad-ons',
  templateUrl: './detailed-ad-ons.component.html',
  styleUrls: ['./detailed-ad-ons.component.css']
})
export class DetailedAdOnsComponent implements OnInit {

  @Input("addedEquipments") equipmentList: AdditionalEquipment[];

  constructor() { }

  ngOnInit(): void {
  }

}
