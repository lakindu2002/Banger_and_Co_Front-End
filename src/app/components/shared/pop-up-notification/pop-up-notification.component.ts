import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pop-up-notification',
  templateUrl: './pop-up-notification.component.html',
  styleUrls: ['./pop-up-notification.component.css']
})
export class PopUpNotificationComponent implements OnInit {

  headerMessage: string;
  isSuccess: boolean;
  errorList: { error: string, message: string }[];
  errorMessage: string;
  errorMessageDetails: string;
  successMessage: string;

  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void {
  }

  hidePopup() {
    this.modalRef.hide();
  }


}
