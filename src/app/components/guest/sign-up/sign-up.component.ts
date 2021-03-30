import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

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

  constructor(private modalRef: BsModalRef, private spinner: NgxSpinnerService, private userService: UserService) { }

  ngOnInit(): void {
    this.signUpProceed = true;
    this.maxDate = new Date();

    //initialize forms referenced from template.
    this.userInfoForm = new FormGroup({
      'firstName': new FormControl(null, [Validators.required]),
      'lastName': new FormControl(null, [Validators.required]),
      'emailAddress': new FormControl(null, [Validators.email, Validators.required]),
      'contactNumber': new FormControl(null, [Validators.required]),
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
      this.imageLoaded = false;
      const reader = new FileReader(); //create a file reader
      reader.readAsDataURL(fileSelected); //read the image into a url

      reader.onload = (() => {
        //once it is loaded as a url
        this.imageLoaded = true;
        this.imageUrl = reader.result;
        this.loadedImage = fileSelected;
      })
    }
  }

  createAccount() {
    this.signUpProceed = true;
    if (this.userInfoForm.valid && this.passwordForm.valid && this.imageLoaded) {
      this.signUpProceed = true;

      //create the user object that is to be sent to the REST API
      const theUser: User = {
        firstName: this.userInfoForm.get('firstName').value,
        lastName: this.userInfoForm.get('lastName').value,
        contactNumber: this.userInfoForm.get('contactNumber').value,
        dateOfBirth: this.userInfoForm.get('dateOfBirth').value,
        emailAddress: this.userInfoForm.get('emailAddress').value,
        password: this.passwordForm.get('firstPassword').value,
      }

      const signUpData: FormData = new FormData();
      signUpData.append("userInfo", JSON.stringify(theUser));
      signUpData.append("profilePic", this.loadedImage);
    } else {
      this.signUpProceed = false; //halt signup as data is invalid
    }
  }
}
