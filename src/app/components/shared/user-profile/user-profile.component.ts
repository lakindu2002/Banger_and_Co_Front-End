import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthReturn } from 'src/app/models/auth.return.model';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { ResponseAPI } from 'src/app/models/response.model';
import { UserUserModel } from 'src/app/models/update.user.model';
import { User } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment.prod';

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
    private toast: ToastrService) { }

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
      (error: ErrorResponse) => {
        this.toast.error(error.message, error.header);
        setTimeout(()=>{
          //timeout used as when request occurs quickly, modal causes an async issue.
          //in production, this can be avoided as network calls take time
          this.modalRef.hide();
        },150)
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
          this.toast.success(
            "Your account information has been updated successfully. You will recieve an email with confirmation",
            "Account Details Updated");
        }
        this.spinner.hide();
      }, (error: ErrorResponse) => {
        if (error.multipleErrors.length > 0) {
          for (const errors of error.multipleErrors) {
            this.toast.warning(errors.message);
          }
        }
        this.toast.error(error.message, error.header);
        this.spinner.hide();
      });
    }
  }
}
