import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-pop-up-notification',
  templateUrl: './pop-up-notification.component.html',
  styleUrls: ['./pop-up-notification.component.css']
})
export class PopUpNotificationComponent implements OnInit {

  headerMessage: string = null;
  isSuccess: boolean = true;
  successMessage: string = null;

  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void { }

  hidePopup() {
    this.modalRef.hide();
  }
}
