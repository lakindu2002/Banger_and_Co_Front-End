import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { VehicleTypeService } from 'src/app/services/vehicleType.service';

@Component({
  selector: 'app-type-delete-prompt',
  templateUrl: './type-delete-prompt.component.html',
  styleUrls: ['./type-delete-prompt.component.css']
})
export class TypeDeletePromptComponent implements OnInit {

  deleteSuccess: Subject<boolean> = new Subject();
  deleteId: number;

  constructor(
    private vehicleTypeService: VehicleTypeService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private modalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  onDeleteClick(): void {
    this.spinner.show();
    this.vehicleTypeService.removeById(this.deleteId).subscribe((data) => {
      this.toast.success("The Vehicle Type has been removed from Banger and Co. successfully!", "Vehicle Type Removed")
      this.deleteSuccess.next(true);

      this.modalRef.hide();
      this.spinner.hide();
    }, (error: ErrorResponse) => {
      this.modalRef.hide();
      this.toast.error(error.exceptionMessage, "Vehicle Type Not Removed");
      this.spinner.hide();
    })
  }

  dismissModal() {
    this.modalRef.hide();
  }



}
