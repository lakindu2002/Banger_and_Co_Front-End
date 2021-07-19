import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { ResponseAPI } from 'src/app/models/response.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-create',
  templateUrl: './admin-create.component.html',
  styleUrls: ['./admin-create.component.css']
})
export class AdminCreateComponent implements OnInit {

  accountCreated: Subject<boolean> = new Subject();
  adminForm: FormGroup;
  adminProfilePicture: File
  maxDate: Date;
  loadedUrl: string | ArrayBuffer;

  constructor(
    private modalRef: BsModalRef,
    private userService: UserService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService
  ) { }

  ngOnInit(): void {
    this.maxDate = new Date();
    this.adminForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.pattern('^[A-Za-z ]{1,}')]),
      'lastName': new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.pattern('^[A-Za-z ]{1,}')]),
      'emailAddress': new FormControl(null, [Validators.email, Validators.required, Validators.maxLength(255)]),
      'username': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      'contactNumber': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(10), Validators.maxLength(10)],),
      'dateOfBirth': new FormControl(null, [Validators.required]),
    })
  }

  hideModal() {
    this.modalRef.hide();
  }

  createAdministrator() {
    this.spinner.show();
    if (this.adminForm.valid) {
      const userInfo: User = {
        firstName: this.adminForm.get('firstName').value,
        lastName: this.adminForm.get('lastName').value,
        contactNumber: this.adminForm.get('contactNumber').value,
        dateOfBirth: this.adminForm.get('dateOfBirth').value,
        emailAddress: this.adminForm.get('emailAddress').value,
        userPassword: this.adminForm.get('username').value,
        username: this.adminForm.get('username').value,
      }

      this.userService.createAdministratorAccount(userInfo, this.adminProfilePicture).subscribe((data: ResponseAPI) => {
        this.toast.success(data.message, "Administrator Account Created");
        this.spinner.hide();
        this.accountCreated.next(true);
        this.hideModal();
      }, (error: ErrorResponse) => {
        this.spinner.hide();
        if (error.multipleErrors.length > 0) {
          for (const eachError of error.multipleErrors) {
            this.toast.warning(eachError.message);
          }
        }
        this.toast.error(error.exceptionMessage, "Administrator Account Not Created");
      })
    } else {
      this.spinner.hide();
      this.toast.error("The data you entered was invalid", "Administrator Account Not Created");
    }

  }

  loadProfilePicture(selectedFile: File) {
    if (selectedFile.size <= 1024000 * 2) {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(selectedFile);

      fileReader.onload = () => {
        this.adminProfilePicture = selectedFile;
        this.loadedUrl = fileReader.result;
      }
    } else {
      this.toast.error("Please keep the profile photo less than 2MB", "File Size Exceeded");
    }
  }

}
