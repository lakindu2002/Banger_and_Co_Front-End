import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';

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

  licenseImage: any;
  licenseImageUrl: string | ArrayBuffer;
  licenseSizeExceeded: boolean = false;
  licenseLoaded: boolean = false;

  otherIdentityImage: any;
  otherIdentityImageUrl: string | ArrayBuffer;
  otherIdentityImageSizeExceeded: boolean = false;
  otherIdentityImageLoaded: boolean = false;

  constructor(
    private modalRef: BsModalRef,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.signUpProceed = true;
    this.maxDate = new Date();

    //initialize forms referenced from template.
    this.userInfoForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.pattern('^[A-Za-z ]{1,}')]),
      'lastName': new FormControl(null, [Validators.required, Validators.maxLength(100), Validators.pattern('^[A-Za-z ]{1,}')]),
      'emailAddress': new FormControl(null, [Validators.email, Validators.required, Validators.maxLength(255)]),
      'username': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      'contactNumber': new FormControl(null, [Validators.required, Validators.pattern("^[0-9]+$"), Validators.minLength(10), Validators.maxLength(10)],),
      'dateOfBirth': new FormControl(null, [Validators.required, this.validateAge.bind(this)]),
      'drivingLicenseNumber': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern("^[A-Z]{1}[0-9]{7}$")])
    })

    this.passwordForm = new FormGroup({
      'firstPassword': new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      'secondPassword': new FormControl("", [Validators.required, Validators.minLength(6), Validators.maxLength(15)])
    })
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  fileLoaded(fileSelected: File): void {
    if (fileSelected) {
      this.imageSizeExceeded = false;
      if (fileSelected.size <= 2048000) {
        //if image is less than 2MB
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

  loadLicense(selectedLicense: File): void {
    if (selectedLicense) {
      this.licenseSizeExceeded = false;
      if (selectedLicense.size <= (1024000 * 5)) {
        //maximum size is 5MB
        this.licenseSizeExceeded = false;
        this.licenseLoaded = false;
        const reader = new FileReader(); //create a file reader
        reader.readAsDataURL(selectedLicense); //read the image into a url

        reader.onload = (() => {
          //once it is loaded as a url
          this.licenseLoaded = true;
          this.licenseImageUrl = reader.result;
          this.licenseImage = selectedLicense;
        })
      } else {
        this.licenseLoaded = false;
        this.licenseSizeExceeded = true;
      }
    }
  }

  loadOtherIdentification(selectOtherImage: File): void {
    if (selectOtherImage) {
      this.otherIdentityImageSizeExceeded = false;
      if (selectOtherImage.size <= (1024000 * 5)) {
        //maximum size is 5MB
        this.otherIdentityImageSizeExceeded = false;
        this.otherIdentityImageLoaded = false;
        const reader = new FileReader(); //create a file reader
        reader.readAsDataURL(selectOtherImage); //read the image into a url

        reader.onload = (() => {
          //once it is loaded as a url
          this.otherIdentityImageLoaded = true;
          this.otherIdentityImageUrl = reader.result;
          this.otherIdentityImage = selectOtherImage;
        })
      } else {
        this.otherIdentityImageLoaded = false;
        this.otherIdentityImageSizeExceeded = true;
      }
    }
  }

  createAccount(): void {
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
        username: this.userInfoForm.get('username').value,
        drivingLicenseNumber: this.userInfoForm.get('drivingLicenseNumber').value
      }

      //using form data to send a file to the server
      const signUpData: FormData = new FormData();
      signUpData.append("userProfile", JSON.stringify(theUser));
      signUpData.append("profilePic", this.loadedImage);
      signUpData.append("licensePic", this.licenseImage);
      signUpData.append("otherIdentity", this.otherIdentityImage);

      this.authService.createAccount(signUpData).subscribe((data: any) => {
        if (data.code === 200) {
          //if returned response entity has status code of 200, everything went fine.
          this.toast.success("Your account has been created. Log in to access your account. You will recieve an email with confirmation", "Account Created Successfully");
          this.modalRef.hide(); //hide sign up modal
        }
        this.spinner.hide();
      }, (error: ErrorResponse) => {
        this.toast.error(error.exceptionMessage, "Account Not Created Successfully");

        if (error.multipleErrors.length > 0) {
          for (const eachError of error.multipleErrors) {
            this.toast.warning(eachError.message);
          }
        }
        this.spinner.hide();
      })
    } else {
      this.signUpProceed = false; //halt signup as data is invalid
    }
  }

  validateAge(dateSelected: FormControl) {
    if (dateSelected.value) {
      const selectedDate: Date = dateSelected.value as Date;
      const age: number = Math.abs(new Date(Date.now() - selectedDate.getTime()).getFullYear() - 1970);

      if (age < 18) {
        return { ageInvalid: true };
      } else if (age > 100) {
        return { ageInvalid: true };
      } else {
        return null;
      }
    } else {
      return null;
    }
  }
}
