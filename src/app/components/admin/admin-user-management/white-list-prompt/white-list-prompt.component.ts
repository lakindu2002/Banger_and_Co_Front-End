import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-white-list-prompt',
  templateUrl: './white-list-prompt.component.html',
  styleUrls: ['./white-list-prompt.component.css']
})
export class WhiteListPromptComponent implements OnInit {

  whiteListUsername: string;
  whiteListSubject: Subject<boolean> = new Subject();

  constructor(
    private modalRef: BsModalRef,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  whiteListUserDB(): void {
    this.spinner.show();

    this.userService.whiteListCustomer(this.whiteListUsername).subscribe((data) => {
      this.whiteListSubject.next(true); //emit true that notifies the component observing to this.
      this.toast.success(data.message, "Customer Whitelisted Successfully");
      this.spinner.hide();

      this.modalRef.hide();
    }, (error: ErrorResponse) => {
      this.toast.error(error.exceptionMessage, "Customer Not Whitelisted");
      this.spinner.hide();
    })
  }

}
