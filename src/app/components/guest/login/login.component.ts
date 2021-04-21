import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthRequest } from 'src/app/models/AuthRequest.model';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  theForm: FormGroup;
  errorMessage: string;
  isError: boolean = false;
  errorList: any = []

  constructor(private modalRef: BsModalRef, private modalService: BsModalService, private authService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.theForm = new FormGroup({
      'username': new FormControl(null, [Validators.required]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  handleLogin(): void {
    //initiate login
    if (this.theForm.valid) {
      this.errorMessage = "";
      this.errorList = [];
      this.isError = false;
      //only if form is valid executed
      this.spinner.show(); //show spinner
      const authReq: AuthRequest = this.theForm.value; //construct a request DTO

      this.authService.authenticateUser(authReq).subscribe((data) => {
        if (data.user_info && data.response.code === 200) {
          this.authService.guideToModule(data.user_info);
        }
        this.modalRef.hide();
        this.spinner.hide();
      },
        (error: HttpErrorResponse) => {
          this.isError = true;
          const errorObj: ErrorResponse = error.error;

          if (errorObj) {
            if (errorObj.exceptionMessage) {
              if (errorObj.exceptionMessage.toLowerCase() === "bad credentials") {
                this.errorMessage = "Invalid Username or Password";
                this.errorList = errorObj.multipleErrors;
              }
            } else {
              this.errorList = errorObj.multipleErrors;
              this.errorMessage = "An Unknown Error Occured On Our End. Please Try Again";
            }
          }

          this.spinner.hide();
        });
    }
  }

  openSignUp() {
    this.modalService.show(SignUpComponent, {
      class: 'modal-lg modal-dialog-centered',
    })
    this.modalRef.hide();
  }

}
