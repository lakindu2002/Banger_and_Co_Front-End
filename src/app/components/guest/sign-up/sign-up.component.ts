import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

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

  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void {
    this.maxDate = new Date();

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

  fileLoaded(fileSelected: Blob) {
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
    console.log({ userprofile: this.userInfoForm, passwords: this.passwordForm, image: this.loadedImage });
  }
}
