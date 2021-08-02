import { Component, OnInit } from '@angular/core';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-profits-made12-months',
  templateUrl: './profits-made12-months.component.html',
  styleUrls: ['./profits-made12-months.component.css']
})
export class ProfitsMade12MonthsComponent implements OnInit {

  constructor(private rentalService: RentalService) { }

  ngOnInit(): void {
    this.rentalService.getProfitsForLast12Months().subscribe((data) => {
      console.log(data);
    })
  }

}
