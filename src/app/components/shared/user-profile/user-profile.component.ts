import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthReturn } from 'src/app/models/auth.return.model';
import { ResponseAPI } from 'src/app/models/response.model';
import { UserUserModel } from 'src/app/models/update.user.model';
import { User } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment.prod';
import { PopUpNotificationComponent } from '../pop-up-notification/pop-up-notification.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  loggedInUser: User
  profilePhotoUrl: string;
  userAge: number = 0;
  passwordValid: boolean = true;
  contactBeforeUpdate: string;

  handleUpdateForm: FormGroup;

  constructor(
    private modalRef: BsModalRef,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private localStorageService: LocalStorageService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    if (localStorage.getItem("user_details")) {
      this.spinner.show();

      const user: AuthReturn = this.localStorageService.getUserInLocalStorage();

      this.getProfileInformation(user.username);
    }

    this.handleUpdateForm = new FormGroup({
      'contactNumber': new FormControl("", [Validators.pattern("^[0-9]+$"), Validators.minLength(10)],),
      'firstPassword': new FormControl("", [Validators.minLength(6)]),
      'secondPassword': new FormControl("", [Validators.minLength(6)])
    })
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  getProfileInformation(username: string): void {
    this.userService.getUserInformation(username).subscribe((data) => {
      this.loggedInUser = data;

      this.handleUpdateForm.patchValue({
        "contactNumber": this.loggedInUser.contactNumber
      });

      this.contactBeforeUpdate = this.loggedInUser.contactNumber;

      const userDateOfBirth: Date = new Date(this.loggedInUser.dateOfBirth);
      this.userAge = Math.abs(new Date(Date.now() - userDateOfBirth.getTime()).getFullYear() - 1970);
      this.profilePhotoUrl = `${environment.profilePhotoBase}${this.loggedInUser.profilePicture}`;

      this.spinner.hide();
    },
      (error: HttpErrorResponse) => {
        console.log(error);
        this.spinner.hide();
      })
  }

  validatePassword(): void {
    const firstPassword: string = this.handleUpdateForm.get("firstPassword").value;
    const secondPassword: string = this.handleUpdateForm.get("secondPassword").value;

    if (firstPassword.length === 0 && secondPassword.length === 0) {
      this.passwordValid = true;
    } else {
      if ((firstPassword === secondPassword) && (firstPassword.length >= 6 && secondPassword.length >= 6)) {
        this.passwordValid = true;
      } else {
        this.passwordValid = false;
      }
    }
  }

  handleUpdate() {
    if (this.handleUpdateForm.valid) {
      this.spinner.show();

      const updateCriteria: UserUserModel = {
        contactNumber: this.handleUpdateForm.get("contactNumber").value,
        userPassword: this.handleUpdateForm.get("firstPassword").value ? this.handleUpdateForm.get("firstPassword").value : null,
        username: this.loggedInUser.username
      }

      this.userService.updateUserInformation(updateCriteria).subscribe((data: ResponseAPI) => {
        if (data.code === 200) {
          this.modalRef.hide();

          this.modalService.show(PopUpNotificationComponent, {
            class: 'modal-dialog-centered', //center the dialog on load
            initialState: {
              headerMessage: "Account Details Updated", //passing the modal header text
              isSuccess: true, //used to load the pass/fail data
              successMessage: "Your account information has been updated successfully. You will recieve an email with confirmation"
            },
            keyboard: false, //disable esc dismiss
            ignoreBackdropClick: true //disable backdrop exit
          })

        }
        this.spinner.hide();
      }, (error) => {
        this.closeModal();
        this.spinner.hide();
      });
    }
  }
}
