import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {

  greeting: string = "";
  fullName: string = "";

  constructor() { }

  ngOnInit(): void {
    document.title = "Banger and Co. - Rent a Vehicle Now";

    this.generateGreeting();
    this.fullName = "John Doe";
  }

  generateGreeting() {
    const currentHour = new Date().getHours(); //retrieves the current hours (10pm = 22)
    if (currentHour < 12) {
      //if time is between 0am to 12pm
      this.greeting = "Good Morning,";
    } else if (currentHour >= 12 && currentHour < 18) {
      //if time is between 12pm to 6pm
      this.greeting = "Good Afternoon,";
    } else if (currentHour >= 18 || currentHour < 24) {
      //if time is between 6pm to 12am
      this.greeting = "Good Evening,";
    }
  }

}
