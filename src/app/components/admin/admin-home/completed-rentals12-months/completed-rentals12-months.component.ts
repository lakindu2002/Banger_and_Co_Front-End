import { Component, OnInit } from '@angular/core';
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

  constructor(private rentalService: RentalService) { }

  ngOnInit(): void {
    this.rentalService.getCompletedRentalsForPast12Months().subscribe((data) => {
      for (const eachMonth of data) {
        this.barChartContent.push({ name: eachMonth.month, value: eachMonth.count });
      }
    })
  }

}
