import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-completed-rentals12-months',
  templateUrl: './completed-rentals12-months.component.html',
  styleUrls: ['./completed-rentals12-months.component.css']
})
export class CompletedRentals12MonthsComponent implements OnInit {

  barChartContent: { name: string, value: number }[] = [];
  colorScheme = {
    domain: [
      "#0061A8", "#2978B5", "#8AB6D6"
    ]
  }

  isError: boolean = false;

  constructor(
    private rentalService: RentalService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.loadBarChart();
  }

  loadBarChart() {
    this.spinner.show("bar-chart");
    this.barChartContent = [];

    this.rentalService.getCompletedRentalsForPast12Months().subscribe((data) => {
      for (const eachMonth of data) {
        this.barChartContent.push({ name: eachMonth.month, value: eachMonth.count });
      }
      this.spinner.hide("bar-chart");

      if (this.barChartContent.length == 0) {
        this.toast.info("There are no completed rentals at Banger and Co.", "No Completed Rental Summary");
      }
    }, (error: ErrorResponse) => {
      this.spinner.hide("bar-chart");
      this.toast.error(error.exceptionMessage, "Rentals Completed Over Past Year Not Loaded");
      this.isError = true;
    })
  }

  refresh() {
    this.loadBarChart();
  }

}
