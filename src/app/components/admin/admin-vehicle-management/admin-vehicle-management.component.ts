import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { VehicleCreateUpdateComponent } from './vehicle-create-update/vehicle-create-update.component';

@Component({
  selector: 'app-admin-vehicle-management',
  templateUrl: './admin-vehicle-management.component.html',
  styleUrls: ['./admin-vehicle-management.component.css']
})
export class AdminVehicleManagementComponent implements OnInit {

  modalRef: BsModalRef; //holds a reference to the opened modal

  constructor(
    private toast: ToastrService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
  }

  launchCreateModal() {
    //launch the create vehicle modal
    this.modalRef = this.modalService.show(VehicleCreateUpdateComponent,
      //configure initial state
      {
        animated:true,
        ignoreBackdropClick:true,
        keyboard:false,
        class:'modal-lg modal-dialog-centered'
      }
    )
  }

}
