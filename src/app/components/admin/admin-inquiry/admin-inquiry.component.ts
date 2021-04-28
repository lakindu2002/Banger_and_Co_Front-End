import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Inquiry } from 'src/app/models/inquiry.model';
import { InquiryService } from 'src/app/services/inquiry.service';

@Component({
  selector: 'app-admin-inquiry',
  templateUrl: './admin-inquiry.component.html',
  styleUrls: ['./admin-inquiry.component.css']
})
export class AdminInquiryComponent implements OnInit {

  inquiryList: Inquiry[] = [];
  isError: boolean = false;

  constructor(private inquiryService: InquiryService, private toast: ToastrService, private spinner: NgxSpinnerService) { }

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
}
