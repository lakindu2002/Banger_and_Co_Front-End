import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
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
  isError : boolean = false; //denote an error in the service to show message in template.

  //used to save subscription for the success and unsubscribe.
  //done because angular doesn't automatically unsubscribe from custom observables
  successObservable: Subscription;

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

    //subscribe to the success subject
    //access the "success" subject and subscribe to the subject to be notified whenever it emits a new value
    this.successObservable = this.modalRef.content.success.subscribe((data) => {
      //once creation has occured successfully, refresh the data.
      this.getAllEquipment();
    })
  }

  getAllEquipment() {
    this.spinner.show();
    this.isError = false;

    this.equipmentService.getAll().subscribe((data) => {
      this.equipmentList = data;
      this.isError = false;
      this.spinner.hide();
    }, (error: ErrorResponse) => {
      this.isError = true;
      this.toast.error(error.exceptionMessage, "Additional Equipments Not Retrieved");
      this.spinner.hide();
    })
  }
}
