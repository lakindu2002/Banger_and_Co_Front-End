import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Inquiry } from 'src/app/models/inquiry.model';
import { ResponseAPI } from 'src/app/models/response.model';
import { InquiryService } from 'src/app/services/inquiry.service';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  theForm: FormGroup;
  modalRef: BsModalRef;

  constructor(
    private modalService: BsModalService,
    private inquiryService: InquiryService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    document.title = "Contact Us | Banger and Co."

    this.theForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'subject': new FormControl(null, Validators.required),
      'message': new FormControl(null, Validators.required),
      'emailAddress': new FormControl(null, [Validators.required, Validators.email]),
      'contactNumber': new FormControl(null, Validators.required)
    })
  }

  processInquirySubmit(): void {
    if (this.theForm.valid) {
      this.spinner.show(); //show the loading bar

      //initialize the Data Transmission Object to sent to API
      const inquiryObject: Inquiry = {
        contactNumber: this.theForm.get('contactNumber').value,
        emailAddress: this.theForm.get('emailAddress').value,
        firstName: this.theForm.get('firstName').value,
        inquirySubject: this.theForm.get('subject').value,
        lastName: this.theForm.get('lastName').value,
        message: this.theForm.get('message').value
      }

      //call API endpoint
      this.inquiryService.createInquiry(inquiryObject).subscribe((data: ResponseAPI) => {
        if (data.code === 200) {
          //if api provides 200 response code, show the success message
          this.theForm.reset(); //clear form
          this.toast.success("Your inquiry was recorded sucessfully. Our team will get back to you via email.", "Inquiry Recorded Successfully");
          this.spinner.hide();
        }

      }, (returnedError: ErrorResponse) => {
        if (returnedError.multipleErrors.length > 0) {
          for (const error of returnedError.multipleErrors) {
            this.toast.warning(error.message);
          }
        }
        this.toast.error(returnedError.exceptionMessage, "Inquiry Failed To Submit");

        this.spinner.hide();
      })
    }
  }

}
