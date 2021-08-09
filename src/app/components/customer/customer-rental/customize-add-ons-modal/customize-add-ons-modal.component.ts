import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdditionalEquipment } from 'src/app/models/equipment.model';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { ResponseAPI } from 'src/app/models/response.model';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-customize-add-ons-modal',
  templateUrl: './customize-add-ons-modal.component.html',
  styleUrls: ['./customize-add-ons-modal.component.css']
})
export class CustomizeAddOnsModalComponent implements OnInit {

  addedEquipment: any[];
  newCost: number = 0;
  rentalId: number = 0;

  constructor(
    private modalRef: BsModalRef,
    private rentalService: RentalService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  hideModal() {
    this.modalRef.hide();
  }

  customizeInDb() {
    const updateEquipments: AdditionalEquipment[] = [];
    this.addedEquipment.forEach((eachAddOn) => {
      //send only the equipment id, quantity added to the database.
      updateEquipments.push(
        {
          equipmentId: eachAddOn.equipment.equipmentId,
          equipmentName: eachAddOn.equipment.equipmentName,
          equipmentQuantity: eachAddOn.equipment.equipmentQuantity,
          pricePerDay: eachAddOn.equipment.pricePerDay,
          quantitySelectedForRental: eachAddOn.quantity,
          totalCostOfEquipmentInRental: eachAddOn.totalCost
        }
      )
    })

    const updateObj = {
      rental: this.rentalId,
      updateEquipments: updateEquipments
    }

    this.spinner.show();
    this.rentalService.updateRentalAddOn(updateObj).subscribe((data: ResponseAPI) => {
      this.toast.success(data.message, "Rental Additional Equipment Updated Successfully");
      this.hideModal();
      //http://localhost:4200/customer/rentals/detailed/62
      this.router.navigate(['/customer', 'rentals', 'detailed', this.rentalId])
      this.spinner.hide();
    }, (error: ErrorResponse) => {
      if (error.multipleErrors.length > 0) {
        for (const eachError of error.multipleErrors) {
          this.toast.warning(eachError.message);
        }
      }
      this.toast.error(error.exceptionMessage, "Failed To Update Additional Equipments In Rental");
      this.spinner.hide();
    })
  }

}
