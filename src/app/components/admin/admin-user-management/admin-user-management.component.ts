import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-user-management',
  templateUrl: './admin-user-management.component.html',
  styleUrls: ['./admin-user-management.component.css']
})
export class AdminUserManagementComponent implements OnInit {

  userList: User[] = [];
  isError: boolean = false;

  constructor(
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.spinner.show();

    this.userService.getAllCustomers().subscribe((data) => {
      //all customers
      console.log(data);
      this.userList = data;
      this.spinner.hide();
    }, (error: ErrorResponse) => {
      this.isError = true;
      this.toast.error(error.exceptionMessage, "Customers Not Loaded")
      this.spinner.hide();
    })
  }
}
