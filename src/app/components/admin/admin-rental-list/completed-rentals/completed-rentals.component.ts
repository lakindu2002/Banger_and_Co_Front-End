import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Rental } from 'src/app/models/rental.model';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-completed-rentals',
  templateUrl: './completed-rentals.component.html',
  styleUrls: ['./completed-rentals.component.css']
})
export class CompletedRentalsComponent implements OnInit {

  isError: boolean = false;
  completedRentals: Rental[] = [];
  filteredList: Rental[] = [];
  pageNumber: number = 0; //initial page number required by API is 0

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private rentalService: RentalService
  ) { }

  ngOnInit(): void {
    this.loadAllCompletedRentals();
  }

  loadAllCompletedRentals() {
    this.spinner.show();
    this.isError = false;

    this.rentalService.getAllCompletedRentals(this.pageNumber).subscribe((data) => {
      this.completedRentals = this.completedRentals.concat(data.allCompleted);
      this.filteredList = this.completedRentals;
      this.pageNumber = data.nextPage;
      this.spinner.hide();

      this.toast.info(`There are ${this.completedRentals.length} completed rentals at Banger and Co.`, "Completed Rentals Available");
    }, (error: ErrorResponse) => {
      this.spinner.hide();
      this.toast.error(error.exceptionMessage, "Failed to load Completed Rentals");
      this.isError = true;
    })
  }

  getNextPage() {
    this.loadAllCompletedRentals()
  }

  search(enteredVehicleName: string) {
    if (enteredVehicleName.length == 0) {
      this.filteredList = this.completedRentals;
    } else {
      this.filteredList = this.completedRentals.filter((eachRental) => {
        return eachRental.vehicleToBeRented.vehicleName.toLowerCase().includes(enteredVehicleName.toLowerCase());
      })
    }
  }

}
