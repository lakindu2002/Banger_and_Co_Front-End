import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Rental } from 'src/app/models/rental.model';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-approved-rentals',
  templateUrl: './approved-rentals.component.html',
  styleUrls: ['./approved-rentals.component.css']
})
export class ApprovedRentalsComponent implements OnInit {

  pageNumber: number = 0;
  approvedRentals: Rental[] = [];
  filteredList: Rental[] = [];
  isError: boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private rentalService: RentalService
  ) { }

  ngOnInit(): void {
    this.loadAllApprovedRentals();
  }

  loadAllApprovedRentals() {
    this.spinner.show();
    this.rentalService.getAllApprovedRentals(this.pageNumber).subscribe((data) => {
      this.approvedRentals = this.approvedRentals.concat(data.approvedRentals); //merge data.
      this.filteredList = this.approvedRentals;

      this.toast.info(`There are ${this.approvedRentals.length} approved rentals that need to be collected by customers`, "Approved Rentals Available");
      this.pageNumber = data.nextPage; //set the next page number to query for data.
      this.spinner.hide();
      this.isError = false;

    }, (error: ErrorResponse) => {
      this.isError = true;
      this.toast.error(error.exceptionMessage, "Failed to Load Approved Rentals");
      this.spinner.hide();
    })
  }

  getMore() {
    this.loadAllApprovedRentals();
  }

  searchByCustomerName(customerName: string) {
    if (customerName.length === 0) {
      this.filteredList = this.approvedRentals;
    } else {
      this.filteredList = this.approvedRentals.filter((eachRental) => {
        const customerFullName: string = `${eachRental.customerUsername.firstName} ${eachRental.customerUsername.lastName}`
        return customerFullName.toLowerCase().includes(customerName.toLowerCase());
      })
    }
  }

  searchTriggered(vehicleName: string) {
    if (vehicleName.length === 0) {
      this.filteredList = this.approvedRentals;
    } else {
      this.filteredList = this.approvedRentals.filter((eachRental) => {
        return eachRental.vehicleToBeRented.vehicleName.toLowerCase().includes(vehicleName.toLowerCase())
      })
    }
  }

}
