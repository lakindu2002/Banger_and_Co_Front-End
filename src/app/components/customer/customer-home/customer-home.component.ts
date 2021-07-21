import { Component, OnInit, } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { LocalStorageService } from 'src/app/services/localstorage.service';
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

  constructor(private modalService: BsModalService, private localStorageService: LocalStorageService, private toast: ToastrService) { }

  ngOnInit(): void {
    document.title = "Banger and Co. - Rent a Vehicle Now";

    this.generateGreeting();
    this.loggedInUser = localStorage.getItem(environment.userInfoStorage) ? JSON.parse(localStorage.getItem(environment.userInfoStorage)) : null;
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
