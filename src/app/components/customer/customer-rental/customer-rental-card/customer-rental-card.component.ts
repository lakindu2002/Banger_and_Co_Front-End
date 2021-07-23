import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Rental } from 'src/app/models/rental.model';

@Component({
  selector: 'app-customer-rental-card',
  templateUrl: './customer-rental-card.component.html',
  styleUrls: ['./customer-rental-card.component.css']
})
export class CustomerRentalCardComponent implements OnInit {

  @Input("theRental") theRental: Rental;

  constructor(private router: Router) { }

  ngOnInit(): void {
    console.log(this.theRental);
  }

  getBadgeText(): string {
    if (this.theRental.approved === undefined || this.theRental.approved === null) {
      return "Pending";
    } if (this.theRental.approved === false) {
      return "Rejected";
    } if (this.theRental.collected === false) {
      return "Can Be Collected";
    } if (this.theRental.returned === true) {
      return "Vehicle Returned";
    }
    if (this.theRental.collected === true) {
      return "Rental Started";
    }
  }

  getClassForBadge() {
    if (this.theRental.approved === undefined || this.theRental.approved === null) {
      return "badge badge-primary";
    } if (this.theRental.approved === false) {
      return "badge badge-danger";
    } if (this.theRental.collected === false) {
      return "badge badge-primary";
    } if (this.theRental.returned === true) {
      return "badge badge-success";
    }
    if (this.theRental.collected === true) {
      return "badge badge-primary";
    }
  }

  getMoreRentalInformation() {

  }

}
