import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
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

  constructor(private modalRef: BsModalRef, private userService: UserService, private spinner: NgxSpinnerService, private localStorageService: LocalStorageService) { }

  ngOnInit(): void {
    if (localStorage.getItem("user_details")) {
      this.spinner.show();

      const user: User = this.localStorageService.getUserInLocalStorage();

      this.getProfileInformation(user.username);
    }
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  getProfileInformation(username: string): void {
    this.userService.getUserInformation(username).subscribe((data) => {
      this.loggedInUser = data;
      this.profilePhotoUrl = `${environment.profilePhotoBase}${this.loggedInUser.profilePicture}`;

      this.spinner.hide();
    },
      (error: HttpErrorResponse) => {
        console.log(error);
        if (error.status === 404) {
          console.log("resource not found");
        } else if (error.status === 403) {
          console.log("unauthorized");
        } else if (error.status >= 500) {
          console.log("internal server")
        }else{
          console.log("unknown error")
        }
        this.spinner.hide();
      })
  }

}
