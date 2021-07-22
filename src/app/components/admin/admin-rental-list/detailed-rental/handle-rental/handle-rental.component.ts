import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-handle-rental',
  templateUrl: './handle-rental.component.html',
  styleUrls: ['./handle-rental.component.css']
})
export class HandleRentalComponent implements OnInit {

  action: string = "";
  rentalBeingApproved: boolean = false;
  rentalId: number;
  rejectedReason: string = "";

  constructor(
    private modalRef: BsModalRef,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private rentalService: RentalService
  ) { }

  ngOnInit(): void {
    if (this.rentalBeingApproved) {
      this.action = "Approve Rental";
    } else {
      this.action = "Reject Rental";
    }
  }

  hideModal() {
    this.modalRef.hide();
  }

  handleRentalApproveReject() {
    if (this.rentalBeingApproved) {
      //rental needs to be approved.
      this.approveRental();
    } else {
      //rental needs to be rejected.
      this.rejectRental();
    }
  }

  approveRental() {
    this.rentalService.approveRental(this.rentalId).subscribe((data) => {
      this.toast.success(data.message, "Rental Approved Successfully");
      this.spinner.hide();
      this.hideModal();
      this.router.navigate(['admin', 'rentals'], { replaceUrl: true });
    }, (error: ErrorResponse) => {
      this.toast.error(error.exceptionMessage, "Rental Not Approved");
      this.spinner.hide();
    })
  }

  rejectRental() {
    if (this.rejectedReason.length > 0) {
      this.spinner.show();
      this.rentalService.rejectRental(this.rentalId, this.rejectedReason).subscribe((data) => {
        this.toast.success(data.message, "Rental Rejected Successfully");
        this.spinner.hide();
        this.hideModal();
        this.router.navigate(['admin', 'rentals'], { replaceUrl: true });
      }, (error: ErrorResponse) => {
        this.toast.error(error.exceptionMessage, "Rental Not Rejected");
        this.spinner.hide();
      })
    } else {
      this.toast.error("Please provide a reason to reject the rental");
    }
  }

}

