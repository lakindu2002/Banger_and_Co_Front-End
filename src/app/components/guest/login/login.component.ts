import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { AuthRequest } from 'src/app/models/AuthRequest.model';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { ResponseAPI } from 'src/app/models/response.model';
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

  constructor(private modalRef: BsModalRef,
    private modalService: BsModalService,
    private authService: AuthService,
    private spinner: NgxSpinnerService,
    private toast: ToastrService) { }

  ngOnInit(): void {
    this.theForm = new FormGroup({
      'username': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6), Validators.maxLength(15)]),
    });
  }

  closeModal(): void {
    this.modalRef.hide();
  }

  handleLogin(): void {
    //initiate login
    if (this.theForm.valid) {
      //only if form is valid executed
      this.spinner.show(); //show spinner
      const authReq: AuthRequest = this.theForm.value; //construct a request DTO
      this.theForm.reset();

      this.authService.authenticateUser(authReq).subscribe((data) => {
        if (data.user_info && data.response.code === 200) {
          this.authService.guideToModule(data.user_info);
        }
        this.modalRef.hide();
        this.spinner.hide();
      },
        (error: ErrorResponse) => {
          if (error.exceptionMessage.toLowerCase() === "bad credentials") {
            error.message = "Invalid Username or Password";
         }
          this.toast.error(error.message, "Authentication Failed");

          if (error.multipleErrors.length > 0) {
            for (const eachError of error.multipleErrors) {
              this.toast.warning(eachError.message);
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
