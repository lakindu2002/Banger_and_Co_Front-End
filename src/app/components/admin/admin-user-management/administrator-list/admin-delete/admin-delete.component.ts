import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-delete',
  templateUrl: './admin-delete.component.html',
  styleUrls: ['./admin-delete.component.css']
})
export class AdminDeleteComponent implements OnInit {

  deletingUser: User;
  deleted: Subject<boolean> = new Subject();

  constructor(
    private spinner: NgxSpinnerService,
    private userSerivce: UserService,
    private toast: ToastrService,
    private modalRef: BsModalRef
  ) { }

  ngOnInit(): void {
  }

  deleteInDb() {
    this.userSerivce.deleteAdministratorAccount(this.deletingUser.username).subscribe((data) => {
      this.toast.show(data.message, "Account Deleted From Banger and Co.")
      this.spinner.hide()
      this.deleted.next(true);
      this.hideModal();
    }, (error: ErrorResponse) => {
      this.toast.error(error.exceptionMessage, "Account Not Deleted");
      this.spinner.hide();
    })
  }

  hideModal() {
    this.modalRef.hide();
  }

}
