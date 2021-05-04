import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Inquiry } from 'src/app/models/inquiry.model';
import { InquiryService } from 'src/app/services/inquiry.service';
import { InquiryManageComponent } from './inquiry-manage/inquiry-manage.component';

@Component({
  selector: 'app-admin-inquiry',
  templateUrl: './admin-inquiry.component.html',
  styleUrls: ['./admin-inquiry.component.css']
})
export class AdminInquiryComponent implements OnInit, OnDestroy {

  inquiryList: Inquiry[] = [];
  isError: boolean = false;
  inquiryRemoveSubscription: Subscription

  constructor(private inquiryService: InquiryService,
    private toast: ToastrService,
    private spinner: NgxSpinnerService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.getPendingInquiry();
  }

  getPendingInquiry() {
    this.spinner.show();
    this.isError = false;
    this.inquiryList = [];

    this.inquiryService.getAllPendingInquiries().subscribe((data) => {
      this.inquiryList = data;
      this.sortList("descending");

      if (this.inquiryList.length === 0) {
        this.toast.info("No new inquiries available at this moment. You have responded to every inquiry made.", "No New Inquiries")
      } else {
        this.toast.info(`You have ${this.inquiryList.length} inquiries to respond.`, "Inquiries Available")
      }
      this.spinner.hide()
    }, (error: ErrorResponse) => {
      this.toast.error(error.message, "Failed to Retrieve Inquiries");
      this.isError = true;
      this.spinner.hide();
    })
  }

  processChange(sorter: string): void {
    switch (sorter) {
      case "most-recent": {
        this.sortList("descending")
        break;
      }
      case "least-recent": {
        this.sortList("ascending");
        break;
      }
    }
  }

  sortList(type: string): void {
    switch (type) {
      case "descending": {
        this.inquiryList = this.inquiryList.sort((a, b) => {
          const aCreatedTime: number = a.createdAt;
          const bCreatedTime: number = b.createdAt;

          return bCreatedTime - aCreatedTime;
        });
        break;
      }
      case "ascending": {
        this.inquiryList = this.inquiryList.sort((a, b) => {
          const aCreatedTime: number = a.createdAt;
          const bCreatedTime: number = b.createdAt;

          return aCreatedTime - bCreatedTime;
        })
        break;
      }
    }
  }

  removeInquiry(id: number): void {
    const modalRef: BsModalRef = this.modalService.show(InquiryManageComponent, {
      backdrop: true,
      ignoreBackdropClick: true,
      keyboard: false,
      class: 'modal-dialog-centered',
      initialState: {
        inquiryId: id
      }
    })

    this.inquiryRemoveSubscription = modalRef.content.deleteSuccess.subscribe((data) => {
      console.log("here");
      //listen to the subject emitting new data by accessing the modal content property.
      if (data == true) {
        //if a boolean of true was emitted
        this.inquiryRemoveSubscription.unsubscribe();
        this.getPendingInquiry();
      }
    })
  }

  ngOnDestroy(): void {
    if (this.inquiryRemoveSubscription) {
      //if a subscription was made
      if (!this.inquiryRemoveSubscription.closed) {
        //check if it is still active.
        this.inquiryRemoveSubscription.unsubscribe();
      }
    }
  }
}
