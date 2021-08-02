import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-profits-made12-months',
  templateUrl: './profits-made12-months.component.html',
  styleUrls: ['./profits-made12-months.component.css']
})
export class ProfitsMade12MonthsComponent implements OnInit {

  colorScheme = {
    domain: [
      "#0061A8", "#2978B5", "#8AB6D6"
    ]
  }

  lineChartData: { name: string, series: { name: string, value: number }[] }[] = [];
  dataForEachMonth: { name: string, value: number }[] = [];
  isError: boolean = false;


  constructor(
    private rentalService: RentalService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    this.loadLineChart();
  }

  loadLineChart() {
    this.spinner.show('line-chart');
    this.isError = false;
    this.lineChartData = [];

    this.rentalService.getProfitsForLast12Months().subscribe((data) => {
      for (const eachMonth of data) {
        this.dataForEachMonth.push(
          {
            name: eachMonth.month,
            value: eachMonth.totalForTheMonth
          }
        )
      }
      this.lineChartData.push(
        {
          name: 'Earnings Over Past Year',
          series: this.dataForEachMonth
        }
      )
      this.spinner.hide('line-chart');

      if (this.lineChartData.length == 0) {
        this.toast.info("No Earnings made by Banger and Co.", "No Earnings (Profits) Made");
      }
    }, (error: ErrorResponse) => {
      this.spinner.hide("line-chart");
      this.toast.error(error.exceptionMessage, "Earnings Over Past Year Not Loaded");
      this.isError = true;
    })
  }

  refresh() {
    this.loadLineChart();
  }

}
