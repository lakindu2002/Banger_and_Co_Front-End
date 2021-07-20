import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-admin-rental-list',
  templateUrl: './admin-rental-list.component.html',
  styleUrls: ['./admin-rental-list.component.css']
})
export class AdminRentalListComponent implements OnInit {

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
    this.rentalService.getAllPendingRentals().subscribe((data) => {
      this.spinner.hide();
      this.toast.info(`There are ${data.length} pending rentals that require approval`,"Pending Rentals Available");
    }, (error: ErrorResponse) => {
      this.toast.error(error.exceptionMessage, "Failed to Load Pending Rentals");
      this.spinner.hide();
    })
  }

}
