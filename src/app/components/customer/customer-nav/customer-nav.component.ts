import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment.prod';
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
  profilePicString: string;
  loggedInUser: User;

  constructor(private modalSerivce: BsModalService, private authService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    const userString = localStorage.getItem(environment.userInfoStorage);
    this.loggedInUser = userString ? JSON.parse(userString) : null;
    this.profilePicString = this.loggedInUser ? `data:image/jpeg;base64,${this.loggedInUser.profilePicture}` : null;

  }

  showProfile(): void {
    this.modalSerivce.show(UserProfileComponent, {
      class: 'modal-lg modal-dialog-centered',
      ignoreBackdropClick: true,
      keyboard: false
    })
  }

  logout(): void {
    this.spinner.show();
    this.authService.logout();
    this.spinner.hide();
  }
}
