import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { VehicleRentalFilterPopUpComponent } from '../../shared/vehicle-rental-filter-pop-up/vehicle-rental-filter-pop-up.component';

@Component({
  selector: 'app-customer-rental',
  templateUrl: './customer-rental.component.html',
  styleUrls: ['./customer-rental.component.css']
})
export class CustomerRentalComponent implements OnInit {

  modalRef: BsModalRef;

  constructor(
    private localStorageService: LocalStorageService,
    private modalService: BsModalService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
  }

  openVehicleRentalFilterPopup() {
    if (!this.localStorageService.getUserInLocalStorage().blacklisted) {
      this.modalRef = this.modalService.show(VehicleRentalFilterPopUpComponent, {
        ignoreBackdropClick: true,
        keyboard: false,
        class: 'modal-dialog-centered modal-lg',
      })
    } else {
      this.toast.error("You cannot make any rentals as your account has been blacklisted.", "Account Blacklisted");
    }
  }

}
