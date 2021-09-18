import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AdditionalEquipment } from 'src/app/models/equipment.model';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { EquipmentService } from 'src/app/services/equipment.service';

@Component({
  selector: 'app-delete-equipment-prompt',
  templateUrl: './delete-equipment-prompt.component.html',
  styleUrls: ['./delete-equipment-prompt.component.css']
})
export class DeleteEquipmentPromptComponent implements OnInit {

  theEquipment: AdditionalEquipment;
  deleteSuccess: Subject<boolean> = new Subject();

  constructor(
    private additionalEquipmentService: EquipmentService,
    private modalRef: BsModalRef,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
  }

  deleteEquipment() {
    this.spinner.show();
    this.additionalEquipmentService.removeById(this.theEquipment.equipmentId).subscribe((data) => {
      this.toast.success(data.message, "Additional Equipment Removed Successfully");
      this.deleteSuccess.next(true);
      this.spinner.hide();
      this.modalRef.hide();
    }, (error: ErrorResponse) => {
      this.toast.error(error.message, "Additional Equipment Not Removed")
      this.spinner.hide();
      this.modalRef.hide();
    })
  }

  dismissModal(){
    this.modalRef.hide();
  }
}
