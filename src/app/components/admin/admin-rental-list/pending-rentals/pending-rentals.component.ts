import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Rental } from 'src/app/models/rental.model';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-pending-rentals',
  templateUrl: './pending-rentals.component.html',
  styleUrls: ['./pending-rentals.component.css']
})
export class PendingRentalsComponent implements OnInit {

  pageNumber: number = 0;
  pendingRentals: Rental[] = [];
  filteredList: Rental[] = [];
  isError: boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private rentalService: RentalService
  ) { }

  ngOnInit(): void {
    this.loadAllPendingRentals();
  }

  loadAllPendingRentals() {
    this.spinner.show();
    this.rentalService.getAllPendingRentals(this.pageNumber).subscribe((data) => {
      this.pendingRentals = this.pendingRentals.concat(data.thePendingRentals); //merge data.
      this.filteredList = this.pendingRentals;

      this.toast.info(`There are ${this.pendingRentals.length} pending rentals that require approval`, "Pending Rentals Available");
      this.pageNumber = data.nextPageNumber; //set the next page number to query for data.
      this.spinner.hide();
      this.isError = false;

    }, (error: ErrorResponse) => {
      this.isError = true;
      this.toast.error(error.exceptionMessage, "Failed to Load Pending Rentals");
      this.spinner.hide();
    })
  }

  getNextPagePlusThisPage() {
    this.loadAllPendingRentals();
  }

  filterTriggered(filterText: string) {
    if (filterText.length === 0) {
      this.filteredList = this.pendingRentals;
    } else {
      this.filteredList = this.pendingRentals.filter((eachRental) => {
        return eachRental.vehicleToBeRented.vehicleName.toLowerCase().includes(filterText);
      })
    }
  }

}
