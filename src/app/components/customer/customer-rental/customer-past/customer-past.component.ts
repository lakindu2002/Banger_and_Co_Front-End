import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Rental } from 'src/app/models/rental.model';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-customer-past',
  templateUrl: './customer-past.component.html',
  styleUrls: ['./customer-past.component.css']
})
export class CustomerPastComponent implements OnInit {

  pageNumber: number = 0;
  pastRentals: Rental[] = [];
  isError: boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private rentalService: RentalService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.getPastInDb();
  }

  getPastInDb() {
    this.isError = false;
    this.spinner.show();
    this.rentalService.getPastRentalsForCustomer(this.localStorage.getUserInLocalStorage().username, this.pageNumber).subscribe((data) => {
      this.pageNumber = data.nextPage;
      this.pastRentals = this.pastRentals.concat(data.customerCompletedRentals);
      this.toast.info(`There are ${this.pastRentals.length} past rentals`, "Past Rentals");
      this.spinner.hide();
    }, (error: ErrorResponse) => {
      this.isError = true;
      this.toast.error(error.exceptionMessage, "Failed To Load Your Past Rentals");
      this.spinner.hide();
    })
  }

  getNextPage() {
    this.getPastInDb();
  }
}
