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
  rentalBeingCollected: boolean = false;
  rentalBeingReturned: boolean = false;
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
    } else if (!this.rentalBeingApproved && !this.rentalBeingCollected && !this.rentalBeingReturned) {
      this.action = "Reject Rental";
    } else if (!this.rentalBeingApproved && !this.rentalBeingReturned && this.rentalBeingCollected) {
      this.action = "Start Rental";
    } else if (!this.rentalBeingApproved && this.rentalBeingReturned && !this.rentalBeingCollected) {
      this.action = "Return Rental (Finish Rental)";
    }
  }

  hideModal() {
    this.modalRef.hide();
  }

  handleAction() {
    if (this.rentalBeingApproved) {
      //approve rental
      this.approveRental();
    } else if (!this.rentalBeingApproved && !this.rentalBeingCollected && !this.rentalBeingReturned) {
      //reject rental
      this.rejectRental();
    } else if (!this.rentalBeingApproved && !this.rentalBeingReturned && this.rentalBeingCollected) {
      //start the rental as it is being collected
      this.startRental()
    } else if (!this.rentalBeingApproved && this.rentalBeingReturned && !this.rentalBeingCollected) {
      //end the rental as it is being returned
      this.finishRental()
    }
  }

  startRental() {
    this.spinner.show();
    this.rentalService.startRental(this.rentalId).subscribe((data) => {
      this.toast.success(data.message, "Rental Started Successfully");
      this.spinner.hide();
      this.hideModal();
      this.router.navigate(['/admin', 'rentals','approved'], { replaceUrl: true })
    }, (error: ErrorResponse) => {
      this.spinner.hide();
      this.toast.error(error.exceptionMessage, "Rental Not Started");
    })
  }

  finishRental() {
    throw new Error('Method not implemented.');
  }

  approveRental() {
    this.spinner.show();
    this.rentalService.approveRental(this.rentalId).subscribe((data) => {
      this.toast.success(data.message, "Rental Approved Successfully");
      this.spinner.hide();
      this.hideModal();
      this.router.navigate(['admin', 'rentals','pending'], { replaceUrl: true });
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
        this.router.navigate(['admin', 'rentals','pending'], { replaceUrl: true });
      }, (error: ErrorResponse) => {
        this.toast.error(error.exceptionMessage, "Rental Not Rejected");
        this.spinner.hide();
      })
    } else {
      this.toast.error("Please provide a reason to reject the rental");
    }
  }

  getHeader() {
    if (this.rentalBeingApproved) {
      return "Approve Rental";
    } else if (!this.rentalBeingApproved && !this.rentalBeingCollected && !this.rentalBeingReturned) {
      return "Reject Rental";
    } else if (!this.rentalBeingApproved && !this.rentalBeingReturned && this.rentalBeingCollected) {
      return "Start Rental";
    } else if (!this.rentalBeingApproved && this.rentalBeingReturned && !this.rentalBeingCollected) {
      return "Return Rental (Finish Rental)";
    }
  }
}

