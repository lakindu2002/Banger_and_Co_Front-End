import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Rental } from 'src/app/models/rental.model';
import { User } from 'src/app/models/user.model';
import { RentalService } from 'src/app/services/rental.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {

  greeting: string = "";
  loggedInUser: User;


  rentalsToBeCollectedForThisMonth: Rental[] = [];
  allPendingRentals: Rental[] = [];
  allOnGoingRentals: Rental[] = [];

  rentalsForLoading: Rental[];
  rentalType: string = "";

  constructor(
    private rentalService: RentalService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    document.title = "Banger and Co. - Rent a Vehicle Now";

    this.generateGreeting();
    this.loggedInUser = localStorage.getItem(environment.userInfoStorage) ? JSON.parse(localStorage.getItem(environment.userInfoStorage)) : null;

    this.getVehiclesToBeCollectedForThisMonth()
    this.getAllPendingRentals();
    this.getAllOnGoingRentals();
  }

  getAllOnGoingRentals() {
    this.rentalService.getAllOnGoingRentalsForChart().subscribe((data) => {
      this.allOnGoingRentals = this.allOnGoingRentals.concat(data);
    }, (error: ErrorResponse) => {
      this.toastr.error(error.exceptionMessage, "On-Going Rentals Not Loaded");
    })
  }

  getVehiclesToBeCollectedForThisMonth() {
    this.rentalService.getVehiclesToBeCollectedForThisMonth().subscribe((data) => {
      this.rentalsToBeCollectedForThisMonth = data;
    }, (error: ErrorResponse) => {
      this.toastr.error(error.exceptionMessage, "Vehicles To Be Collected For This Month Not Loaded");
    })
  }

  getAllPendingRentals() {
    this.rentalService.getAllPendingRentalsForDashboard().subscribe((data) => {
      this.allPendingRentals = data
    }, (error: ErrorResponse) => {
      this.toastr.error(error.exceptionMessage, "Total Pending Rentals Pending Not Loaded");
    })
  }

  generateGreeting(): void {
    const currentHour = new Date().getHours(); //retrieves the current hours (0 to 23)
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

  cardClicked(requiredData: string) {
    switch (requiredData.toLowerCase()) {
      case "ongoing": {
        this.rentalsForLoading = this.allOnGoingRentals;
        this.rentalType = "All On-Going Rentals";

        break;
      }

      case "rentalsforcollection": {
        this.rentalsForLoading = this.rentalsToBeCollectedForThisMonth;
        this.rentalType = "All Rentals For Collection";

        break;
      }

      case "pending": {
        this.rentalsForLoading = this.allPendingRentals;
        this.rentalType = "All Pending Rentals";

        break;
      }
    }
  }
}
