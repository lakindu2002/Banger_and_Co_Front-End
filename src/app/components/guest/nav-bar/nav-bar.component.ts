import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { LoginComponent } from '../login/login.component';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  openedModal: BsModalRef;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }

  openSignUp(): void {
    this.openedModal = this.modalService.show(SignUpComponent, {
      class: 'modal-xl modal-dialog-centered',
      ignoreBackdropClick: true,
      keyboard: false
    })
  }

  openLogin(): void {
    this.openedModal = this.modalService.show(LoginComponent, {
      keyboard: false,
      ignoreBackdropClick: true,
      class: 'modal-dialog-centered',
    })
  }

}
