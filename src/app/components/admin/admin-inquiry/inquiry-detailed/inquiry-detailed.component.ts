import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { InquiryReply } from 'src/app/models/inquiry-reply.model';
import { Inquiry } from 'src/app/models/inquiry.model';
import { InquiryService } from 'src/app/services/inquiry.service';

@Component({
  selector: 'app-inquiry-detailed',
  templateUrl: './inquiry-detailed.component.html',
  styleUrls: ['./inquiry-detailed.component.css']
})
export class InquiryDetailedComponent implements OnInit {

  theInquiry: Inquiry;
  inquiryReplied: Subject<boolean> = new Subject();
  inquiryReplyForm: FormGroup;

  constructor(
    private modalRef: BsModalRef,
    private inquiryService: InquiryService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.inquiryReplyForm = new FormGroup({
      'reply': new FormControl(null, [Validators.required])
    })
  }

  hideModal() {
    this.modalRef.hide();
  }

  replyInquiry(): void {
    if (this.inquiryReplyForm.valid) {

      this.spinner.show();

      const inquiryReplyObj: InquiryReply = {
        inquiryId: this.theInquiry.inquiryId,
        inquiryReply: this.inquiryReplyForm.get('reply').value,
      }

      this.inquiryService.replyToInquiry(inquiryReplyObj).subscribe((data)=>{

        this.spinner.hide();
        this.toast.success("Your reply has been successfully sent back to the client","Inquiry Successfully Replied");
        this.inquiryReplied.next(true);

        this.hideModal();

      },(error:ErrorResponse)=>{
        this.toast.error(error.exceptionMessage,"Inquiry Not Replied");

        if(error.multipleErrors){
          this.toast.warning("The inputs were badly formatted","Inquiry Reply Failed");
          for(const errorList of error.multipleErrors){
            this.toast.warning(errorList.message);
          }
        }
        this.spinner.hide();
      })
    }
  }

}
