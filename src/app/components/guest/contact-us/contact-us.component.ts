import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ContactUsStateComponent } from './contact-us-state/contact-us-state.component';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  theForm: FormGroup;
  modalRef: BsModalRef;

  constructor(private modalService: BsModalService) { }

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

  processInquirySubmit() {
    console.log(this.theForm.value)
    this.modalRef = this.modalService.show(ContactUsStateComponent, {
      class: 'modal-dialog-centered', //center the dialog on load
      initialState: {
        headerMessage: "Inquiry Did Not Submit Successfully", //passing the modal header text
        isSuccess: false //used to load the pass/fail data
      },
      keyboard: false, //disable esc dismiss
      ignoreBackdropClick: true //disable backdrop exit
    })
  }

}
