import { Component, OnDestroy, OnInit } from '@angular/core';
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
export class EquipmentManagementComponent implements OnInit, OnDestroy {

  private modalRef: BsModalRef;
  equipmentList: AdditionalEquipment[];
  isError: boolean = false; //denote an error in the service to show message in template.

  //used to save subscription for the success and unsubscribe.
  //done because angular doesn't automatically unsubscribe from custom observables
  successSubscription: Subscription;

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

  loadCreateEquipment(): void {
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
    this.successSubscription = this.modalRef.content.success.subscribe((data) => {
      //once creation has occured successfully, refresh the data.
      this.getAllEquipment();
    })
  }

  getAllEquipment(): void {
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

  openEditAdditionalEquipment(equipmentId: number): void {
    this.spinner.show();
    //query from backend the equipment information for the equipment id
    this.equipmentService.getById(equipmentId).subscribe((data: AdditionalEquipment) => {
      //open the edit modal.
      this.modalRef = this.modalService.show(EquipmentCreateManageComponent, {
        animated: true,
        class: 'modal-dialog-centered modal',
        keyboard: false,
        ignoreBackdropClick: true,
        initialState: {
          createMode: false,
          theEquipmentBeingEdited: data
        }
      })

      this.spinner.hide();

      this.successSubscription = this.modalRef.content.success.subscribe((data) => {
        //when edited successfully, load all equipment from backend
        this.getAllEquipment();
      })
    }, (error: ErrorResponse) => {
      //error occured
      this.toast.error(error.exceptionMessage, "Equipment Information Not Loaded")
      this.spinner.hide();
    })
  }

  ngOnDestroy(): void {
    //if a subscription is present, unsubscribe when the component is destroyed
    if (this.successSubscription) {
      this.successSubscription.unsubscribe(); //stop listening for changes when component is destroyed
    }
  }

}
