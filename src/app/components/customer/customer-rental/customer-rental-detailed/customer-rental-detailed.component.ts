import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Rental } from 'src/app/models/rental.model';
import { RentalService } from 'src/app/services/rental.service';
import { RentalLateReturnPopUpComponent } from './rental-late-return-pop-up/rental-late-return-pop-up.component';
import { UpdateRentalTimeComponent } from './update-rental-time/update-rental-time.component';

@Component({
  selector: 'app-customer-rental-detailed',
  templateUrl: './customer-rental-detailed.component.html',
  styleUrls: ['./customer-rental-detailed.component.css']
})
export class CustomerRentalDetailedComponent implements OnInit, OnDestroy {

  theRental: Rental;
  modalRef: BsModalRef;
  updateSub: Subscription;


  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute,
    private modalService: BsModalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.loadDetailedRentalDB(data.rentalId);
    })
  }

  loadDetailedRentalDB(rentalId: number) {
    this.spinner.show();
    this.rentalService.getRentalById(rentalId).subscribe((data) => {
      this.theRental = data;
      this.spinner.hide();
    }, (error: ErrorResponse) => {
      this.spinner.hide();
      this.toast.error(error.exceptionMessage, "Failed to Load Detailed Rental Information");
    })
  }

  getBadgeName(): string {
    if (this.theRental.approved === undefined || this.theRental.approved === null) {
      return "Rental Pending";
    }
    if (this.theRental.approved === false) {
      return "Rental Rejected";
    }
    if (this.theRental.collected === false) {
      return "Rental Can Be Collected";
    }
    if (this.theRental.returned === true) {
      return "Rental Completed";
    }
    if (this.theRental.collected === true) {
      return "Rental Started";
    }
  }

  getBadgeClass() {
    if (this.theRental.approved === undefined || this.theRental.approved === null) {
      return "badge badge-primary";
    }
    if (this.theRental.approved === false) {
      return "badge badge-danger";
    }
    if (this.theRental.collected === false) {
      return "badge badge-primary";
    }
    if (this.theRental.returned === true) {
      return "badge badge-success";
    }
    if (this.theRental.collected === true) {
      return "badge badge-primary";
    }
  }

  launchCreateLateReturn() {
    this.modalRef = this.modalService.show(RentalLateReturnPopUpComponent, {
      animated: true,
      initialState: {
        rentalId: this.theRental.rentalId
      },
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      keyboard: false
    });

    this.updateSub = this.modalRef.content.isSuccess.subscribe((data) => {
      this.loadDetailedRentalDB(this.theRental.rentalId);
    })
  }

  launchCancelLateReturn() {
    this.modalRef = this.modalService.show(RentalLateReturnPopUpComponent, {
      animated: true,
      initialState: {
        rentalId: this.theRental.rentalId,
        cancelLateReturn: true
      },
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      keyboard: false
    });

    this.updateSub = this.modalRef.content.isSuccess.subscribe((data) => {
      this.loadDetailedRentalDB(this.theRental.rentalId);
    })
  }

  launchUpdateModal() {
    this.modalRef = this.modalService.show(UpdateRentalTimeComponent, {
      initialState: {
        rental: this.theRental
      },
      animated: true,
      keyboard: false,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered modal-lg'
    })

    this.updateSub = this.modalRef.content.isSuccess.subscribe((data) => {
      this.loadDetailedRentalDB(this.theRental.rentalId);
    })
  }

  ngOnDestroy(): void {
    if (this.updateSub) {
      this.updateSub.unsubscribe();
    }
  }

}
