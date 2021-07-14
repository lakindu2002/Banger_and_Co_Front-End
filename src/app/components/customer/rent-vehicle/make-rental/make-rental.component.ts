import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleRentalFilter } from 'src/app/models/vehicle_rental_filter.model';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-make-rental',
  templateUrl: './make-rental.component.html',
  styleUrls: ['./make-rental.component.css']
})
export class MakeRentalComponent implements OnInit {

  rentalDuration: VehicleRentalFilter;
  vehicleToBeRented: Vehicle;
  equipmentsAdded: any;
  totalCostForRental: number;
  licenseImage: string | ArrayBuffer;
  otherIdentity: string | ArrayBuffer;

  constructor(
    private modalRef: BsModalRef,
    private userService: UserService,
    private localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
    this.userService.getLicenseImage(this.localStorageService.getUserInLocalStorage().username).subscribe((data) => {
      const reader = new FileReader();
      const image = data as Blob;
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.licenseImage = reader.result;
      }
    })
    this.userService.getOtherIdentity(this.localStorageService.getUserInLocalStorage().username).subscribe((data) => {
      const reader = new FileReader();
      const image = data as Blob;
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.otherIdentity = reader.result;
      }
    })
  }

  hideModal() {
    this.modalRef.hide();
  }

}
