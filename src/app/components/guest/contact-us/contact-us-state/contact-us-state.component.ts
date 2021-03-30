import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-contact-us-state',
  templateUrl: './contact-us-state.component.html',
  styleUrls: ['./contact-us-state.component.css']
})
export class ContactUsStateComponent implements OnInit {

  headerMessage: string;
  isSuccess: boolean;
  errorList: { error: string, message: string }[];
  errorMessage: string;

  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  hidePopup() {
    this.modalRef.hide();
  }

}
