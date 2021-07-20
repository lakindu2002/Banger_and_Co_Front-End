import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { AdminCreateComponent } from './admin-create/admin-create.component';
import { AdminDeleteComponent } from './admin-delete/admin-delete.component';

@Component({
  selector: 'app-administrator-list',
  templateUrl: './administrator-list.component.html',
  styleUrls: ['./administrator-list.component.css']
})
export class AdministratorListComponent implements OnInit, OnDestroy {

  adminList: User[] = [];
  isError: boolean = false;
  openedModal: BsModalRef;
  modalSub: Subscription;
  deleteSub: Subscription;
  adminCount: number = 0;

  constructor(
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private modalService: BsModalService
  ) { }
  ngOnInit(): void {
    this.getAllAdmins();
  }

  getAllAdmins() {
    this.isError = false;
    this.spinner.show();

    this.userService.getAllAdmins().subscribe((data) => {
      this.adminList = data;
      this.adminCount = this.adminList.length;
      this.spinner.hide();
    }, (error: ErrorResponse) => {
      this.isError = true;
      this.spinner.hide();
      this.toast.error(error.exceptionMessage, "Failed to Load Administrators");
    })
  }

  calculateAge(dateOfBirth: string) {
    const passedDate: Date = new Date(Date.parse(dateOfBirth));
    return Math.abs(new Date(Date.now() - passedDate.getTime()).getFullYear() - 1970);
  }

  openCreateAdminModal() {
    this.openedModal = this.modalService.show(AdminCreateComponent, {
      animated: true,
      ignoreBackdropClick: true,
      keyboard: false,
      class: 'modal-dialog-centered modal-lg'
    })

    this.openedModal.content.accountCreated.subscribe((data) => {
      this.getAllAdmins();
    })
  }

  openDeleteModal(user: User) {
    this.openedModal = this.modalService.show(AdminDeleteComponent, {
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      keyboard: false,
      initialState: {
        deletingUser: user
      }
    });
    this.deleteSub = this.openedModal.content.deleted.subscribe((data) => {
      this.getAllAdmins();
    })
  }

  ngOnDestroy(): void {
    if (this.modalSub) {
      this.modalSub.unsubscribe();
    }
    if (this.deleteSub) {
      this.deleteSub.unsubscribe();
    }
  }

}
