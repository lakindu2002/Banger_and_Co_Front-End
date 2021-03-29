import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { UserProfileComponent } from '../../shared/user-profile/user-profile.component';

@Component({
  selector: 'app-customer-nav',
  templateUrl: './customer-nav.component.html',
  styleUrls: ['./customer-nav.component.css'],
  //used to provide animations for the drop down directive of ngx-bootstrap
  providers: [{ provide: BsDropdownConfig, useValue: { isAnimated: true, autoClose: true } }],
})
export class CustomerNavComponent implements OnInit {

  modalRef: BsModalRef;

  constructor(private modalSerivce: BsModalService) { }

  ngOnInit(): void {
  }

  showProfile(): void {
    this.modalSerivce.show(UserProfileComponent, {
      class: 'modal-lg modal-dialog-centered',
    })
  }
}
