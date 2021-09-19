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
  searchTerm: string = "";
  accountStatus: string = "";

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private userService: UserService,
    private modalService: BsModalService
  ) { }

  ngOnInit(): void {
    this.accountStatus = "all";
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

  filterUsers() {
    this.accountStatus = "all"; //as all users are filtered.
    if (this.searchTerm.length == 0) {
      this.filteredList = this.userList;
    } else {
      //filter users via username or by first name and lastname
      this.filteredList = this.userList.filter((eachUser) => {
        const customerFullName: string = `${eachUser.firstName.toLowerCase()} ${eachUser.lastName.toLowerCase()}`;

        if (customerFullName.includes(this.searchTerm.toLowerCase().trim()) || eachUser.username.toLowerCase().trim().includes(this.searchTerm.toLowerCase().trim())) {
          //if the customer full name includes the search term, return the user to the filtered list.
          //OR
          //if the customer username includes the search term, return the user to the filtered list
          return eachUser;
        }
      })
    }
  }

  resetFilters(): void {
    this.searchTerm = "";
    this.accountStatus = "all";
    this.getAllUsers();
  }

  sortViaAccountStatus(): void {
    this.searchTerm = ""; //viewing all users according to a select filter
    if (this.accountStatus === 'blacklist') {
      this.filteredList = this.userList.filter((eachUser) => {
        return eachUser.blackListed === true;
      })
    } else if (this.accountStatus === 'notblacklisted') {
      this.filteredList = this.userList.filter((eachUser) => {
        return eachUser.blackListed === false;
      })
    } else if (this.accountStatus === 'all') {
      this.filteredList = this.userList;
    }
  }

  ngOnDestroy() {
    //if any subscriptions are active, unsubscribe when destroying component
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
