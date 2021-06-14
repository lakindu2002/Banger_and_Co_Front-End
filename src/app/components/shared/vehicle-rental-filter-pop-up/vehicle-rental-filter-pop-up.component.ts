import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-vehicle-rental-filter-pop-up',
  templateUrl: './vehicle-rental-filter-pop-up.component.html',
  styleUrls: ['./vehicle-rental-filter-pop-up.component.css']
})
export class VehicleRentalFilterPopUpComponent implements OnInit {

  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  hideModal(){
    this.modalRef.hide();
  }

}
