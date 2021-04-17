import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { Inquiry } from 'src/app/models/inquiry.model';
import { ResponseAPI } from 'src/app/models/response.model';
import { InquiryService } from 'src/app/services/inquiry.service';
import { ContactUsStateComponent } from './contact-us-state/contact-us-state.component';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  theForm: FormGroup;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService, private inquiryService: InquiryService, private spinner: NgxSpinnerService) { }

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
          this.modalRef = this.modalService.show(ContactUsStateComponent, {
            class: 'modal-dialog-centered', //center the dialog on load
            initialState: {
              headerMessage: "Inquiry Submitted Successfully", //passing the modal header text
              isSuccess: true,//used to load the pass/fail data,
              errorList: null
            },
            keyboard: false, //disable esc dismiss
            ignoreBackdropClick: true //disable backdrop exit
          })
          this.spinner.hide();
        }

      }, (returnedError: HttpErrorResponse) => {
        const errorResponse: ErrorResponse = returnedError.error;
        this.modalRef = this.modalService.show(ContactUsStateComponent, {
          class: 'modal-dialog-centered', //center the dialog on load
          initialState: {
            headerMessage: "Inquiry Did Not Submit Successfully", //passing the modal header text
            isSuccess: false, //used to load the pass/fail data
            errorList: errorResponse.multipleErrors,
            errorMessage: errorResponse.message
          },
          keyboard: false, //disable esc dismiss
          ignoreBackdropClick: true //disable backdrop exit
        })

        this.spinner.hide();
      })
    }
  }

}
