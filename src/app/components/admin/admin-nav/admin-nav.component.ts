import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { environment } from 'src/environments/environment.prod';
import { UserProfileComponent } from '../../shared/user-profile/user-profile.component';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent implements OnInit {

  modalRef: BsModalRef;
  profilePicString: string;
  loggedInUser: User;

  constructor(private modalSerivce: BsModalService, private authService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    const userString = localStorage.getItem(environment.userInfoStorage);
    this.loggedInUser = userString ? JSON.parse(userString) : null;
    this.profilePicString = this.loggedInUser ? `${environment.profilePhotoBase}${this.loggedInUser.profilePicture}` : null;

  }

  showProfile(): void {
    this.modalSerivce.show(UserProfileComponent, {
      class: 'modal-lg modal-dialog-centered',
      ignoreBackdropClick: true,
      keyboard: false,
    })
  }

  logout(): void {
    this.spinner.show();
    this.authService.logout();
    this.spinner.hide();
  }
}
