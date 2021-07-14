import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AdditionalEquipment } from 'src/app/models/equipment.model';
import { Rental } from 'src/app/models/rental.model';
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
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService
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

  placeRental() {
    let equipmentList: AdditionalEquipment[] = [];
    this.equipmentsAdded.forEach((eachEquipment) => {
      equipmentList.push(eachEquipment.equipment);
    })
    const placingRental: Rental = {
      equipmentsAddedToRental: equipmentList,
      pickupDate: this.rentalDuration.pickupDate,
      pickupTime: this.rentalDuration.pickupTime,
      returnDate: this.rentalDuration.returnDate,
      returnTime: this.rentalDuration.returnTime,
      totalCostForRental: this.totalCostForRental,
      vehicleToBeRented: this.vehicleToBeRented
    };

  }

  hideModal() {
    this.modalRef.hide();
  }

}
