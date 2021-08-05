import { Component, OnInit, } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Rental } from 'src/app/models/rental.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { RentalService } from 'src/app/services/rental.service';
import { environment } from 'src/environments/environment.prod';
import { VehicleRentalFilterPopUpComponent } from '../../shared/vehicle-rental-filter-pop-up/vehicle-rental-filter-pop-up.component';

@Component({
  selector: 'app-customer-home',
  templateUrl: './customer-home.component.html',
  styleUrls: ['./customer-home.component.css']
})
export class CustomerHomeComponent implements OnInit {

  greeting: string = "";
  loggedInUser: User;
  modalRef: BsModalRef;

  onGoingTimeList: Rental[] = [];

  pendingCount: number = 0;
  rejectedCount: number = 0;
  pastCount: number = 0;

  isPendingLoaded: boolean = false;
  isRejectedLoaded: boolean = false;
  isPastLoaded: boolean = false;

  constructor(
    private modalService: BsModalService,
    private localStorageService: LocalStorageService,
    private toast: ToastrService,
    private rentalService: RentalService,
    private spinner: NgxSpinnerService
  ) { }

  ngOnInit(): void {
    document.title = "Banger and Co. - Rent a Vehicle Now";

    this.generateGreeting();
    this.loggedInUser = localStorage.getItem(environment.userInfoStorage) ? JSON.parse(localStorage.getItem(environment.userInfoStorage)) : null;

    this.loadOnGoing();
    this.loadCounts();
  }

  loadCounts() {
    this.spinner.show('card');
    this.rentalService.countCompleted().subscribe((data) => {
      this.pastCount = data.count;
      this.isPastLoaded = true;
      this.clearCardSpinner();
    }, (error: ErrorResponse) => {
      this.isPastLoaded = true;
      this.toast.error(error.exceptionMessage, "Completed Count Not Loaded");
      this.clearCardSpinner();
    })

    this.rentalService.countRejected().subscribe((data) => {
      this.rejectedCount = data.count;
      this.isRejectedLoaded = true;
      this.clearCardSpinner();
    }, (error: ErrorResponse) => {
      this.toast.error(error.exceptionMessage, "Rejected Count Not Loaded");
      this.isRejectedLoaded = true;
      this.clearCardSpinner();
    })

    this.rentalService.countPending().subscribe((data) => {
      this.pendingCount = data.count;
      this.isPendingLoaded = true;
      this.clearCardSpinner();
    }, (error: ErrorResponse) => {
      this.toast.error(error.exceptionMessage, "Pending Count Not Loaded");
      this.isPendingLoaded = true;
      this.clearCardSpinner();
    })
  }

  clearCardSpinner() {
    if (this.isPendingLoaded && this.isRejectedLoaded && this.isPendingLoaded) {
      this.spinner.hide('card');
    }
  }


  loadOnGoing() {
    this.spinner.show('time-list-on-going');
    this.rentalService.getCustomerOnGoingTimeList().subscribe((data) => {
      this.onGoingTimeList = data;
      this.spinner.hide('time-list-on-going');
      console.log(this.onGoingTimeList)
    }, (error: ErrorResponse) => {
      this.toast.error(error.exceptionMessage, "On-Going Rental Not Loaded");
      this.spinner.hide('time-list-on-going');
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

  openVehicleRentalFilterPopup() {
    if (!this.localStorageService.getUserInLocalStorage().blacklisted) {
      this.modalRef = this.modalService.show(VehicleRentalFilterPopUpComponent, {
        ignoreBackdropClick: true,
        keyboard: false,
        class: 'modal-dialog-centered modal-lg',
      })
    } else {
      this.toast.error("You cannot make any rentals as your account has been blacklisted.", "Account Blacklisted");
    }
  }

}
