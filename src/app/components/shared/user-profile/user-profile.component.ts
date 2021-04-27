import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthReturn } from 'src/app/models/auth.return.model';
import { User } from 'src/app/models/user.model';
import { LocalStorageService } from 'src/app/services/localstorage.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  loggedInUser: User
  profilePhotoUrl: string;
  userAge: number = 0;

  constructor(private modalRef: BsModalRef, private userService: UserService, private spinner: NgxSpinnerService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    if (localStorage.getItem("user_details")) {
      this.spinner.show();

      const user: AuthReturn = this.localStorageService.getUserInLocalStorage();

      this.getProfileInformation(user.username);
    }
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  getProfileInformation(username: string): void {
    this.userService.getUserInformation("123").subscribe((data) => {
      this.loggedInUser = data;
      const userDateOfBirth: Date = new Date(this.loggedInUser.dateOfBirth);
      this.userAge = Math.abs(new Date(Date.now() - userDateOfBirth.getTime()).getFullYear() - 1970);
      this.profilePhotoUrl = `${environment.profilePhotoBase}${this.loggedInUser.profilePicture}`;

      this.spinner.hide();
    },
      (error: HttpErrorResponse) => {
        this.spinner.hide();
      })
  }

}
