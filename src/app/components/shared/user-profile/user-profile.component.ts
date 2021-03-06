import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
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
import { ShowUserImagesComponent } from './show-user-images/show-user-images.component';

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
  passwordError: String = "";

  handleUpdateForm: FormGroup;
  additionalModal: BsModalRef;

  constructor(
    private modalRef: BsModalRef,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private localStorageService: LocalStorageService,
    private modalService: BsModalService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    if (localStorage.getItem("user_details")) {
      this.spinner.show();

      const user: AuthReturn = this.localStorageService.getUserInLocalStorage();

      this.getProfileInformation(user.username);
    }

    this.handleUpdateForm = new FormGroup({
      'contactNumber': new FormControl("", [Validators.pattern("^[0-9]+$"), Validators.minLength(10), Validators.maxLength(10)],),
      'firstPassword': new FormControl("", [Validators.minLength(6), Validators.maxLength(15)]),
      'secondPassword': new FormControl("", [Validators.minLength(6), Validators.maxLength(15)])
    })
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  getProfileInformation(username: string): void {
    this.userService.getUserInformation(username).subscribe((data) => {
      this.loggedInUser = data;


      this.handleUpdateForm.patchValue({
        "contactNumber": this.loggedInUser.contactNumber,
      });

      if (this.loggedInUser.userRole === 'customer') {
        this.handleUpdateForm.addControl('drivingLicenseNumber', new FormControl(this.loggedInUser.drivingLicenseNumber, [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("^[A-Z]{1}[0-9]{7}$")]));
      }

      this.contactBeforeUpdate = this.loggedInUser.contactNumber;

      const userDateOfBirth: Date = new Date(this.loggedInUser.dateOfBirth);
      this.userAge = Math.abs(new Date(Date.now() - userDateOfBirth.getTime()).getFullYear() - 1970);
      this.profilePhotoUrl = `${environment.profilePhotoBase}${this.loggedInUser.profilePicture}`;

      this.spinner.hide();
    },
      (error: ErrorResponse) => {
        this.toast.error(error.exceptionMessage, "Profile Information Retrieval Failed");
        setTimeout(() => {
          //timeout used as when request occurs quickly, modal causes an async issue.
          //in production, this can be avoided as network calls take time
          this.modalRef.hide();
        }, 150)
        this.spinner.hide();
      })
  }

  validatePassword(): void {
    const firstPassword: string = this.handleUpdateForm.get("firstPassword").value;
    const secondPassword: string = this.handleUpdateForm.get("secondPassword").value;

    if (firstPassword.length === 0 && secondPassword.length === 0) {
      this.passwordValid = true;
    } else {
      if (
        (firstPassword === secondPassword) &&
        (firstPassword.length >= 6 && secondPassword.length >= 6) &&
        (firstPassword.length <= 15 && secondPassword.length <= 15)
      ) {
        this.passwordValid = true;
      } else {
        this.passwordValid = false;
        this.passwordError = "Password Not Valid (Provide Characters Between 6 and 15 for Password in Both Fields)";
      }

      if (
        (firstPassword != secondPassword) &&
        (firstPassword.length >= 6 && secondPassword.length >= 6) &&
        (firstPassword.length <= 15 && secondPassword.length <= 15)) {
        this.passwordValid = false;
        this.passwordError = "Passwords Do Not Match";
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

      if (this.loggedInUser.userRole.toLocaleLowerCase() === 'customer') {
        updateCriteria.drivingLicenseNumber = this.handleUpdateForm.get("drivingLicenseNumber").value
      }

      this.userService.updateUserInformation(updateCriteria).subscribe((data: ResponseAPI) => {
        if (data.code === 200) {
          this.modalRef.hide();
          this.toast.success(
            "Your account information has been updated successfully. You will recieve an email with confirmation",
            "Profile Details Updated");
        }
        this.spinner.hide();
      }, (error: ErrorResponse) => {
        if (error.multipleErrors.length > 0) {
          for (const errors of error.multipleErrors) {
            this.toast.warning(errors.message);
          }
        }
        this.toast.error(error.exceptionMessage, "Profile Information Failed To Updated");
        this.spinner.hide();
      });
    }
  }

  showLicense() {
    this.additionalModal = this.modalService.show(ShowUserImagesComponent, {
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      keyboard: false,
      backdrop: true,
      initialState: {
        username: this.loggedInUser.username,
        showingState: 'license'
      }
    })
  }

  showOther() {
    this.additionalModal = this.modalService.show(ShowUserImagesComponent, {
      class: 'modal-dialog-centered',
      ignoreBackdropClick: true,
      keyboard: false,
      backdrop: true,
      initialState: {
        username: this.loggedInUser.username,
        showingState: 'other'
      }
    })
  }
}
