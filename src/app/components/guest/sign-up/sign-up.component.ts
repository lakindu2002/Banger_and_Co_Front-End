import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';
import { PopUpNotificationComponent } from '../../shared/pop-up-notification/pop-up-notification.component';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  loadedImage: any;
  imageUrl: string | ArrayBuffer;
  imageLoaded: boolean = false;

  maxDate: Date;

  userInfoForm: FormGroup;
  passwordForm: FormGroup;

  signUpProceed: boolean;
  imageSizeExceeded: boolean = false;


  constructor(
    private modalRef: BsModalRef,
    private spinner: NgxSpinnerService,
    private userService: UserService,
    private modalService: BsModalService) { }

  ngOnInit(): void {
    this.signUpProceed = true;
    this.maxDate = new Date();

    //initialize forms referenced from template.
    this.userInfoForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'emailAddress': new FormControl(null, [Validators.email, Validators.required]),
      'contactNumber': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(10)],),
      'dateOfBirth': new FormControl(null, [Validators.required])
    })

    this.passwordForm = new FormGroup({
      'firstPassword': new FormControl("", [Validators.required, Validators.minLength(6)]),
      'secondPassword': new FormControl("", [Validators.required, Validators.minLength(6)])
    })
  }

  closeModal() {
    this.modalRef.hide();
  }

  fileLoaded(fileSelected: File) {
    if (fileSelected) {
      this.imageSizeExceeded = true;
      if (fileSelected.size <= 100000) {
        //if image is less than 100kb
        this.imageSizeExceeded = false;
        this.imageLoaded = false;
        const reader = new FileReader(); //create a file reader
        reader.readAsDataURL(fileSelected); //read the image into a url

        reader.onload = (() => {
          //once it is loaded as a url
          this.imageLoaded = true;
          this.imageUrl = reader.result;
          this.loadedImage = fileSelected;
        })
      } else {
        this.imageLoaded = false;
        this.imageSizeExceeded = true;
      }
    }
  }

  createAccount() {
    this.signUpProceed = true;

    if (this.userInfoForm.valid && this.passwordForm.valid && this.imageLoaded) {
      this.spinner.show();
      this.signUpProceed = true;

      //create the user object that is to be sent to the REST API
      const theUser: User = {
        firstName: this.userInfoForm.get('firstName').value,
        lastName: this.userInfoForm.get('lastName').value,
        contactNumber: this.userInfoForm.get('contactNumber').value,
        dateOfBirth: this.userInfoForm.get('dateOfBirth').value,
        emailAddress: this.userInfoForm.get('emailAddress').value,
        userPassword: this.passwordForm.get('firstPassword').value,
      }

      //using form data to send a file to the server
      const signUpData: FormData = new FormData();
      signUpData.append("userProfile", JSON.stringify(theUser));
      signUpData.append("profilePic", this.loadedImage);

      this.userService.createAccount(signUpData).subscribe((data: any) => {
        if (data.code === 200) {
          //if returned response entity has status code of 200, everything went fine.
          this.modalService.show(PopUpNotificationComponent, {
            class: 'modal-dialog-centered', //center the dialog on load
            initialState: {
              headerMessage: "Account Successfully Created", //passing the modal header text
              isSuccess: true, //used to load the pass/fail data
              errorList: null,
              errorMessage: null
            },
            keyboard: false, //disable esc dismiss
            ignoreBackdropClick: true //disable backdrop exit
          })
          this.modalRef.hide(); //hide sign up modal
        }
        this.spinner.hide();
      }, (error: HttpErrorResponse) => {
        const errorResponse: ErrorResponse = error.error;
        //during signup, if errors occur
        let errorMessage: string = "";
        if (errorResponse.errorCode === 409) {
          errorMessage = errorResponse.message
        } else if (errorResponse.errorCode === 500) {
          errorMessage = "An Unknown Error Occured on the Server. Please Try Again"
        }
        this.modalService.show(PopUpNotificationComponent, {
          class: 'modal-dialog-centered', //center the dialog on load
          initialState: {
            headerMessage: "Account Creation Failed", //passing the modal header text
            isSuccess: false, //used to load the pass/fail data
            errorList: null,
            errorMessage: errorMessage
          },
          keyboard: false, //disable esc dismiss
          ignoreBackdropClick: true //disable backdrop exit
        })
        this.spinner.hide();
      })
    } else {
      this.signUpProceed = false; //halt signup as data is invalid
    }
  }
}
