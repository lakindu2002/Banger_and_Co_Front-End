import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { ResponseAPI } from 'src/app/models/response.model';
import { RentalService } from 'src/app/services/rental.service';

@Component({
  selector: 'app-rental-late-return-pop-up',
  templateUrl: './rental-late-return-pop-up.component.html',
  styleUrls: ['./rental-late-return-pop-up.component.css']
})
export class RentalLateReturnPopUpComponent implements OnInit {

  rentalId: number;
  isSuccess: Subject<boolean> = new Subject();

  constructor(
    private rentalService: RentalService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private modalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  hideModal() {
    this.modalRef.hide();
  }

  createLateReturn() {
    this.spinner.show();
    this.rentalService.createLateReturn(this.rentalId).subscribe((data: ResponseAPI) => {
      this.toast.success(data.message, "Late Return Made Successfully");
      this.spinner.hide();
      this.hideModal();
      this.isSuccess.next(true);
    }, (error: ErrorResponse) => {
      this.toast.error(error.exceptionMessage, "Failed To Create Late Return");
      this.spinner.hide();
    })
  }
}


