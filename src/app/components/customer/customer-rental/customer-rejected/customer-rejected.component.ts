import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Rental } from 'src/app/models/rental.model';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-customer-rejected',
  templateUrl: './customer-rejected.component.html',
  styleUrls: ['./customer-rejected.component.css']
})
export class CustomerRejectedComponent implements OnInit {

  pageNumber: number = 0;
  rejectedRentals: Rental[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private rentalService: RentalService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.spinner.show();
    this.rentalService.getCustomerRejectedRentals(this.localStorage.getUserInLocalStorage().username, this.pageNumber).subscribe((data) => {
      this.pageNumber = data.nextPage;
      this.rejectedRentals = this.rejectedRentals.concat(data.customerRejectedRentals);
      this.toast.info(`There are ${this.rejectedRentals.length} rejected rentals`, "Rejected Rentals");
      this.spinner.hide();
    }, (error: ErrorResponse) => {
      this.toast.error(error.exceptionMessage, "Failed To Load Your Rejected Rentals");
      this.spinner.hide();
    })
  }

}
