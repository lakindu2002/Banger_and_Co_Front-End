import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { InquiryService } from 'src/app/services/inquiry.service';

@Component({
  selector: 'app-inquiry-manage',
  templateUrl: './inquiry-manage.component.html',
  styleUrls: ['./inquiry-manage.component.css']
})
export class InquiryManageComponent implements OnInit {

  inquiryId: number;
  deleteSuccess: Subject<boolean> = new Subject();

  constructor(
    private modalRef: BsModalRef,
    private spinner: NgxSpinnerService,
    private inquiryService : InquiryService,
    private toast : ToastrService) { }

  ngOnInit(): void {
  }

  hideModal():void{
    this.modalRef.hide();
  }

  processDelete(): void {
    this.spinner.show();
    this.inquiryService.removeInquiry(this.inquiryId).subscribe((data)=>{
      //if inquiry is successfully removed show the success and emit a new value for the observer to listen.
      this.spinner.hide();
      this.toast.success("The inquiry was deleted successfully","Inquiry Deleted Successfully");
      this.deleteSuccess.next(true);

      this.modalRef.hide();
    },(error:ErrorResponse)=>{
      this.spinner.hide();
      this.toast.error(error.exceptionMessage,"Inquiry Deletion Failed");
    })
  }

}
