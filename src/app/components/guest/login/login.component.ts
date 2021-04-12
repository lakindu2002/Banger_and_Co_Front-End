import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthRequest } from 'src/app/models/AuthRequest.model';
import { AuthService } from 'src/app/services/auth.service';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  theForm: FormGroup;

  constructor(private modalRef: BsModalRef, private modalService: BsModalService, private authService: AuthService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.theForm = new FormGroup({
      'emailAddress': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  closeModal() {
    this.modalRef.hide();
  }

  handleLogin() {
    if (this.theForm.valid) {
      this.spinner.show();
      const authReq: AuthRequest = this.theForm.value;

      this.authService.authenticateUser(authReq).subscribe((data) => {
        console.log(data);
        this.spinner.hide();
      }, (error) => {
        console.log(error.error);
        this.spinner.hide();
      })
    }
  }

  openSignUp() {
    this.modalService.show(SignUpComponent, {
      class: 'modal-lg modal-dialog-centered',
    })
    this.modalRef.hide();
  }

}
