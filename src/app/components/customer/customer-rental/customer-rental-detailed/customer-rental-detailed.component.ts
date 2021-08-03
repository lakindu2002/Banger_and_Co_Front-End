import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Rental } from 'src/app/models/rental.model';
import { RentalService } from 'src/app/services/rental.service';
import { RentalLateReturnPopUpComponent } from './rental-late-return-pop-up/rental-late-return-pop-up.component';

@Component({
  selector: 'app-customer-rental-detailed',
  templateUrl: './customer-rental-detailed.component.html',
  styleUrls: ['./customer-rental-detailed.component.css']
})
export class CustomerRentalDetailedComponent implements OnInit {

  theRental: Rental;
  modalRef: BsModalRef;

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
      this.spinner.show();
      this.rentalService.getRentalById(data.rentalId).subscribe((data) => {
        this.theRental = data;
        this.spinner.hide();
      }, (error: ErrorResponse) => {
        this.spinner.hide();
        this.toast.error(error.exceptionMessage, "Failed to Load Detailed Rental Information");
      })
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

    this.modalRef.content.isSuccess.subscribe((data) => {
      this.router.navigate(['/customer', 'rentals', 'on-going']);
    })
  }

}
