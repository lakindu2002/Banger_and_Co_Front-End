import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Rental } from 'src/app/models/rental.model';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-customer-on-going',
  templateUrl: './customer-on-going.component.html',
  styleUrls: ['./customer-on-going.component.css']
})
export class CustomerOnGoingComponent implements OnInit {

  pageNumber: number = 0;
  ongoingRentals: Rental[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private rentalService: RentalService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.rentalService.getOnGoingRentalsForCustomer(this.localStorage.getUserInLocalStorage().username, this.pageNumber).subscribe((data) => {
      this.pageNumber = data.nextPage;
      this.ongoingRentals = this.ongoingRentals.concat(data.customerOnGoingRentals);
      this.toast.info(`There are ${this.ongoingRentals.length} on-going rentals`, "On-Going Rentals");
      this.spinner.hide();
    }, (error: ErrorResponse) => {
      this.toast.error(error.exceptionMessage, "Failed To Load Your On-Going Rentals");
      this.spinner.hide();
    })
  }

}
