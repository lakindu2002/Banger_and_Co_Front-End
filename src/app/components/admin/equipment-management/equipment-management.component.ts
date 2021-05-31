import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AdditionalEquipment } from 'src/app/models/equipment.model';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { EquipmentService } from 'src/app/services/equipment.service';
import { EquipmentCreateManageComponent } from './equipment-create-manage/equipment-create-manage.component';

@Component({
  selector: 'app-equipment-management',
  templateUrl: './equipment-management.component.html',
  styleUrls: ['./equipment-management.component.css']
})
export class EquipmentManagementComponent implements OnInit {

  private modalRef: BsModalRef;
  equipmentList: AdditionalEquipment[];

  constructor(
    private equipmentService: EquipmentService,
    private modalService: BsModalService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    //handle additional initialization tasks
    this.getAllEquipment();
  }

  loadCreateEquipment() {
    this.modalRef = this.modalService.show(EquipmentCreateManageComponent, {
      animated: true,
      class: 'modal-dialog-centered modal',
      keyboard: false,
      ignoreBackdropClick: true,
      initialState: {
        createMode: true
      }
    })
  }

  getAllEquipment() {
    this.spinner.show();

    this.equipmentService.getAll().subscribe((data) => {
      this.equipmentList = data;
      this.spinner.hide();
    }, (error: ErrorResponse) => {
      this.spinner.hide();
      this.toast.error(error.exceptionMessage, "Additional Equipments Not Retrieved");
    })
  }
}
