import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Rental } from 'src/app/models/rental.model';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-customer-approved',
  templateUrl: './customer-approved.component.html',
  styleUrls: ['./customer-approved.component.css']
})
export class CustomerApprovedComponent implements OnInit {

  pageNumber: number = 0;
  approvedRentals: Rental[] = [];

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private rentalService: RentalService,
    private localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
    //approved rentals are the rentals that are not yet picked up but can be collected: ready to be picked up
    this.spinner.show();
    this.rentalService.getRentalsApprovedForCustomer(this.localStorage.getUserInLocalStorage().username, this.pageNumber).subscribe((data) => {
      this.pageNumber = data.nextPage;
      this.approvedRentals = this.approvedRentals.concat(data.customerCanBeCollectedRentals);
      this.toast.info(`There are ${this.approvedRentals.length} approved rentals that can be collected from Banger and Co.`, "Approved Rentals")
      this.spinner.hide();
    }, (error: ErrorResponse) => {
      this.toast.error(error.exceptionMessage, "Failed To Load Your Approved Rentals");
      this.spinner.hide();
    })
  }

}
