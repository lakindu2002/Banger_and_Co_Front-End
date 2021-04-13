import { Component, OnInit } from '@angular/core';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
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
  loggedInUser: User;
  profilePicString: string;

  constructor(private modalSerivce: BsModalService, private authService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    if (sessionStorage.getItem("user_details")) {
      this.loggedInUser = JSON.parse(sessionStorage.getItem("user_details"))
      this.profilePicString = `data:image/jpeg;base64,${this.loggedInUser.profilePicture}`
    }
  }

  showProfile(): void {
    this.modalSerivce.show(UserProfileComponent, {
      class: 'modal-lg modal-dialog-centered',
    })
  }

  logout() {
    this.spinner.show();
    this.authService.logout();
    this.spinner.hide();
  }
}
