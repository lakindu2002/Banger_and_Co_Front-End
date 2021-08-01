import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Rental } from 'src/app/models/rental.model';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-on-going-rentals',
  templateUrl: './on-going-rentals.component.html',
  styleUrls: ['./on-going-rentals.component.css']
})
export class OnGoingRentalsComponent implements OnInit {

  onGoingRentals: Rental[] = [];
  filteredList: Rental[] = [];
  pageNumber: number = 0;
  isError: boolean = false;


  constructor(
    private spinner: NgxSpinnerService,
    private rentalService: RentalService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadAllOnGoingRentals();
  }

  loadAllOnGoingRentals() {
    this.isError = false;
    this.spinner.show();
    this.rentalService.getAllOngoingRentals(this.pageNumber).subscribe((data) => {
      this.onGoingRentals = this.onGoingRentals.concat(data.allOnGoingRentals);
      this.pageNumber = data.nextPage;

      this.filteredList = this.onGoingRentals;
      this.spinner.hide();

      this.toast.info(`There are ${this.onGoingRentals.length} on-going rentals at Banger and Co.`, "On-Going Rentals Available");

      this.isError = false;
    }, (error: ErrorResponse) => {
      this.toast.error(error.exceptionMessage, "Failed to load On-Going Rentals");
      this.spinner.hide();
      this.isError = true;
    })
  }

  getMore() {
    this.loadAllOnGoingRentals(); //this will re-execute the call from the API and retrieve the data for the next page and will merge the data
  }

  searchByCustomerName(customerName: string) {
    if (customerName.length === 0) {
      this.filteredList = this.onGoingRentals;
    } else {
      this.filteredList = this.onGoingRentals.filter((eachRental) => {
        const customerFullName: string = `${eachRental.customerUsername.firstName} ${eachRental.customerUsername.lastName}`
        return customerFullName.toLowerCase().includes(customerName.toLowerCase());
      })
    }
  }

  searchTriggered(vehicleName: string) {
    if (vehicleName.length === 0) {
      this.filteredList = this.onGoingRentals;
    } else {
      this.filteredList = this.onGoingRentals.filter((eachRental) => {
        return eachRental.vehicleToBeRented.vehicleName.toLowerCase().includes(vehicleName.toLowerCase())
      })
    }
  }

}
