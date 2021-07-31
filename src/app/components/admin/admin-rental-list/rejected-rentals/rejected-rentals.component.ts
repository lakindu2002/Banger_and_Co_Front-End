import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Rental } from 'src/app/models/rental.model';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rejected-rentals',
  templateUrl: './rejected-rentals.component.html',
  styleUrls: ['./rejected-rentals.component.css']
})
export class RejectedRentalsComponent implements OnInit {

  pageNumber: number = 0;
  rejectedRentals: Rental[] = [];
  filteredList: Rental[] = [];
  isError: boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private rentalService: RentalService
  ) { }

  ngOnInit(): void {
    this.loadAllRejectedRentals();
  }

  loadAllRejectedRentals() {
    this.spinner.show();
    this.rentalService.getAllRejectedRentals(this.pageNumber).subscribe((data) => {
      this.rejectedRentals = this.rejectedRentals.concat(data.rejectedRentals); //merge data.
      this.filteredList = this.rejectedRentals;
      console.log(this.rejectedRentals);

      this.toast.info(`There are ${this.rejectedRentals.length} rejected rentals`, "Rejected Rentals Available");
      this.pageNumber = data.nextPage; //set the next page number to query for data.
      this.spinner.hide();
      this.isError = false;

    }, (error: ErrorResponse) => {
      this.isError = true;
      this.toast.error(error.exceptionMessage, "Failed to Load Rejected Rentals");
      this.spinner.hide();
    })
  }

  getMore() {
    this.loadAllRejectedRentals();
  }

  searchTriggered(vehicleName: string) {
    if (vehicleName.length === 0) {
      this.filteredList = this.rejectedRentals;
    } else {
      this.filteredList = this.rejectedRentals.filter((eachRental) => {
        return eachRental.vehicleToBeRented.vehicleName.toLowerCase().includes(vehicleName.toLowerCase())
      })
    }
  }

}
