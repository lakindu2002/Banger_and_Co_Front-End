import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Vehicle } from 'src/app/models/vehicle.model';
import { VehicleService } from 'src/app/services/vehicle.service';

@Component({
  selector: 'app-remove-vehicle-prompt',
  templateUrl: './remove-vehicle-prompt.component.html',
  styleUrls: ['./remove-vehicle-prompt.component.css']
})
export class RemoveVehiclePromptComponent implements OnInit {

  vehicleBeingRemoved: Vehicle;
  removed: Subject<boolean> = new Subject();

  constructor(
    private modalRef: BsModalRef,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
  }

  dismissModal() {
    this.modalRef.hide();
  }

  onDeleteClick() {
    this.spinner.show();

    this.vehicleService.removeVehicle(this.vehicleBeingRemoved.vehicleId).subscribe((data) => {
      this.toast.success(data.message, "Vehicle Deleted Successfully");
      this.spinner.hide();
      this.removed.next(true);
      this.dismissModal();
    }, (error: ErrorResponse) => {
      this.toast.error(error.exceptionMessage, "Vehicle Not Deleted");
      this.spinner.hide();
    })
  }

}
