import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Rental } from 'src/app/models/rental.model';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-customer-rental-detailed',
  templateUrl: './customer-rental-detailed.component.html',
  styleUrls: ['./customer-rental-detailed.component.css']
})
export class CustomerRentalDetailedComponent implements OnInit {

  theRental: Rental;

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private rentalService: RentalService,
    private activatedRoute: ActivatedRoute
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

}
