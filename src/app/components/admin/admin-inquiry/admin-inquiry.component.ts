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

  constructor(private inquiryService: InquiryService, private toast: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.getPendingInquiry();
  }

  getPendingInquiry() {
    this.spinner.show();
    this.inquiryList = [];

    this.inquiryService.getAllPendingInquiries().subscribe((data) => {
      this.inquiryList = data;

      if (this.inquiryList.length === 0) {
        this.toast.info("No new inquiries available at this moment. You have responded to every inquiry made.", "No New Inquiries")
      } else {
        this.toast.info(`You have ${this.inquiryList.length} inquiries to respond.`, "Inquiries Available")
      }
      this.spinner.hide()
    }, (error: ErrorResponse) => {
      this.toast.error(error.message, error.header);
      this.spinner.hide();
    })
  }

}
