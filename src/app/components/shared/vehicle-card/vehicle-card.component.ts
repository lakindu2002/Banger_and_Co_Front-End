import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AuthReturn } from 'src/app/models/auth.return.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-vehicle-card',
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.css']
})
export class VehicleCardComponent implements OnInit {

  @Input('vehicleToRender') theVehicle: Vehicle; //the vehicle that will be passed into the component from a parent component.

  @Output("adminClickedDelete") deleteClicked: EventEmitter<Vehicle> = new EventEmitter();

  loggedInUser: AuthReturn;

  constructor(private localStorageService: LocalStorageService, private toast: ToastrService, private vehicleService: VehicleService) { }

  ngOnInit(): void {
    //retrieve logged in user status to enable admin only views.
    this.loggedInUser = this.localStorageService.getUserInLocalStorage();
  }

  handleGuestClick() {
    this.toast.info("Please login or create an account inorder to rent this vehicle", "Account Needed To Proceed")
  }

  handleCustomerClick() {
    //emit a value that will be listened in the "VehiclePanelComponent" in the customer module
    this.vehicleService.customerClickedRent.next(this.theVehicle);
  }

  openDeleteModalInAdmin() {
    //when delete clicked, emit a vehicle object that will be listened on the admin view all vehicles component
    this.deleteClicked.emit(this.theVehicle);
  }
}
