import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Rental } from 'src/app/models/rental.model';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-customer-pending',
  templateUrl: './customer-pending.component.html',
  styleUrls: ['./customer-pending.component.css']
})
export class CustomerPendingComponent implements OnInit {

  pageNumber: number = 0;
  pendingRentals: Rental[] = [];
  isError: boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private rentalService: RentalService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.getPendingRentalsDB();
  }

  getPendingRentalsDB() {
    this.isError = false;
    this.spinner.show();
    this.rentalService.getCustomerPendingRentals(this.localStorage.getUserInLocalStorage().username, this.pageNumber).subscribe((data) => {
      this.pageNumber = data.nextPage;
      this.pendingRentals = this.pendingRentals.concat(data.customerPendingRentals);
      this.toast.info(`There are ${this.pendingRentals.length} pending rentals`, "Pending Rentals");
      this.spinner.hide();
    }, (error: ErrorResponse) => {
      this.isError = true;
      this.toast.error(error.exceptionMessage, "Failed To Load Your Pending Rentals");
      this.spinner.hide();
    })
  }

  getTheNextPage() {
    this.getPendingRentalsDB();
  }
}
