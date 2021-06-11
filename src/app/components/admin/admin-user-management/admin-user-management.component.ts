import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { WhiteListPromptComponent } from './white-list-prompt/white-list-prompt.component';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.css']
})
export class AdminUserManagementComponent implements OnInit, OnDestroy {

  userList: User[] = [];
  filteredList: User[] = [];
  isError: boolean = false;
  modalRef: BsModalRef;
  subscription: Subscription

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private userService: UserService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.spinner.show();

    this.userService.getAllCustomers().subscribe((data) => {
      //all customers
      this.userList = data;
      this.filteredList = this.userList;
      this.spinner.hide();
    }, (error: ErrorResponse) => {
      this.isError = true;
      this.toast.error(error.exceptionMessage, "Customers Not Loaded")
      this.spinner.hide();
    })
  }

  calculateAge(theDate: string): number {
    const passedDate: Date = new Date(Date.parse(theDate));
    return Math.abs(new Date(Date.now() - passedDate.getTime()).getFullYear() - 1970);
  }

  getWhiteListIconStyle(blacklisted: boolean): string {
    if (blacklisted === true) {
      return "red";
    } else {
      return "grey"
    }
  }

  openWhiteListPrompt(theUser: User) {
    if (theUser.blackListed === true) {
      //if user is blacklisted.
      this.modalRef = this.modalService.show(WhiteListPromptComponent, {
        //pass initial data to modal
        animated: true,
        class: 'modal-dialog-centered',
        ignoreBackdropClick: true,
        keyboard: false,
        initialState: {
          whiteListUsername: theUser.username, //pass the username of customer being whitelisted into the property of the Prompt component
          whiteListUser: theUser
        }
      })
      //listen to the subject of the prompt component
      this.subscription = this.modalRef.content.whiteListSubject.subscribe((data) => {
        //if success is emitted
        this.getAllUsers(); //refresh the page.
      })
    }
  }

  ngOnDestroy() {
    //if any subscriptions are active, unsubscribe when destroying component
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
