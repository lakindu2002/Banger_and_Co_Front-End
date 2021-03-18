import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {

  theForm: FormGroup;

  constructor() { }

  ngOnInit(): void {
    this.theForm = new FormGroup({
      'firstName': new FormControl(null, Validators.required),
      'lastName': new FormControl(null, Validators.required),
      'subject': new FormControl(null, Validators.required),
      'message': new FormControl(null, Validators.required),
      'emailAddress': new FormControl(null, [Validators.required, Validators.email]),
      'contactNumber': new FormControl(null, Validators.required)
    })
  }

  processInquirySubmit() {
    console.log(this.theForm.value)
  }

}
