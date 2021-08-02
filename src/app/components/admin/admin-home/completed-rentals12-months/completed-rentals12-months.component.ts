import { Component, OnInit } from '@angular/core';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-completed-rentals12-months',
  templateUrl: './completed-rentals12-months.component.html',
  styleUrls: ['./completed-rentals12-months.component.css']
})
export class CompletedRentals12MonthsComponent implements OnInit {

  constructor(private rentalService: RentalService) { }

  ngOnInit(): void {
    this.rentalService.getCompletedRentalsForPast12Months().subscribe((data) => {
    })
  }

}
