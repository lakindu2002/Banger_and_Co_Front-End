import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdditionalEquipment } from 'src/app/models/equipment.model';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Rental } from 'src/app/models/rental.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleRentalFilter } from 'src/app/models/vehicle_rental_filter.model';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { RentalService } from 'src/app/services/rental.service';
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

  newLicenseImage: File;
  newLicenseImageUrl: string;
  newOtherIdentity: File;
  newOtherIdentityUrl: string;

  constructor(
    private modalRef: BsModalRef,
    private userService: UserService,
    private localStorageService: LocalStorageService,
    private spinner: NgxSpinnerService,
    private rentalService: RentalService,
    private toast: ToastrService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.loadLicenseImageFromDB();
    this.loadOtherIdentityFromDB();
  }

  loadLicenseImageFromDB() {
    this.userService.getLicenseImage(this.localStorageService.getUserInLocalStorage().username).subscribe((data) => {
      const reader = new FileReader();
      const image = data as Blob;
      reader.readAsDataURL(image);
      reader.onload = () => {
        this.licenseImage = reader.result;
      }
    })
  }

  loadOtherIdentityFromDB() {
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
    this.spinner.show();

    let equipmentList: AdditionalEquipment[] = [];
    this.equipmentsAdded.forEach((eachEquipment) => {
      //attach the quantity for the rental.
      eachEquipment.equipment.quantitySelectedForRental = eachEquipment.quantity;
      equipmentList.push(eachEquipment.equipment);
    })
    const placingRental: Rental = {
      equipmentsAddedToRental: equipmentList,
      pickupDate: this.rentalDuration.pickupDate,
      pickupTime: this.rentalDuration.pickupTime,
      returnDate: this.rentalDuration.returnDate,
      returnTime: this.rentalDuration.returnTime,
      totalCostForRental: this.totalCostForRental,
      vehicleToBeRented: this.vehicleToBeRented.vehicleId,
      customerUsername: this.localStorageService.getUserInLocalStorage().username
    };

    this.rentalService.makeRental(placingRental).subscribe((data) => {
      this.toast.success(data.message, "Rental Placed Successfully");
      this.spinner.hide();
      this.router.navigate(['customer'], { replaceUrl: true })
      this.hideModal();
    }, (error: ErrorResponse) => {
      this.spinner.hide();
      if (error.multipleErrors.length > 0) {
        for (const eachError of error.multipleErrors) {
          this.toast.warning(eachError.message);
        }
      }
      this.toast.error(error.exceptionMessage, "Rental Not Placed");
    })
  }

  hideModal() {
    this.modalRef.hide();
  }

  loadNewLicense(newLicense: File) {
    const reader = new FileReader();
    reader.readAsDataURL(newLicense);
    reader.onload = () => {
      this.licenseImage = reader.result;
      this.newLicenseImage = newLicense;
    }
  }

  loadNewOther(newOther: File) {
    const reader = new FileReader();
    reader.readAsDataURL(newOther);
    reader.onload = () => {
      this.otherIdentity = reader.result;
      this.newOtherIdentity = newOther;
    }
  }

  confirmNewOther() {
    this.spinner.show("newOtherIdentity");
    this.userService.updateCustomerOtherIdentityImage(
      this.localStorageService.getUserInLocalStorage().username,
      this.newOtherIdentity
    ).subscribe((data) => {
      this.spinner.hide("newOtherIdentity");
      this.newOtherIdentity = undefined;
      this.loadOtherIdentityFromDB();
      this.toast.success(data.message, "Other Identification Documents Updated");

    }, (error: ErrorResponse) => {
      this.spinner.hide("newOtherIdentity");
      this.loadOtherIdentityFromDB();
      this.toast.error(error.exceptionMessage, "Failed to Update Other Identification")
    })
  }

  confirmNewLicense() {
    this.spinner.show("newLicenseImage");
    this.userService.updateCustomerLicenseImage(
      this.localStorageService.getUserInLocalStorage().username,
      this.newLicenseImage
    ).subscribe((data) => {
      this.spinner.hide("newLicenseImage");
      this.newLicenseImage = undefined;
      this.loadLicenseImageFromDB();
      this.toast.success(data.message, "Driving License Updated");
    }, (error: ErrorResponse) => {
      this.spinner.hide("newLicenseImage");
      this.loadLicenseImageFromDB();
      this.toast.error(error.exceptionMessage, "Failed to Update Driving License")
    })
  }
}
