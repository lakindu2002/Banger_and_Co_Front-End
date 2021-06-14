import { Component, OnInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { VehicleRentalFilterPopUpComponent } from 'src/app/components/shared/vehicle-rental-filter-pop-up/vehicle-rental-filter-pop-up.component';

@Component({
  selector: 'app-jumbotron-home',
  templateUrl: './jumbotron-home.component.html',
  styleUrls: ['./jumbotron-home.component.css']
})
export class JumbotronHomeComponent implements OnInit {

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  openBrowsePanel() {
    this.modalService.show(VehicleRentalFilterPopUpComponent,{
      animated:true,
      ignoreBackdropClick:true,
      keyboard:false,
      class:"modal-dialog-centered modal-lg"
    })
  }

}
