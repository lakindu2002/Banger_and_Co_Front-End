import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Rental } from 'src/app/models/rental.model';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-detailed-rental',
  templateUrl: './detailed-rental.component.html',
  styleUrls: ['./detailed-rental.component.css']
})
export class DetailedRentalComponent implements OnInit {

  loadedRental: Rental;

  constructor(
    private activatedRoute: ActivatedRoute,
    private rentalService: RentalService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((data) => {
      this.loadDetailedRental(data.rentalId);
    })
  }

  loadDetailedRental(rentalId: any) {
    this.spinner.show();
    this.rentalService.getRentalById(rentalId).subscribe((data) => {
      this.loadedRental = data;
      this.spinner.hide();
    }, (error: ErrorResponse) => {
      this.toast.error(error.exceptionMessage, "Failed to Load Detailed Rental Information");
      this.spinner.hide();
    })
  }

}
