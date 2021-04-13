import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthRequest } from 'src/app/models/AuthRequest.model';
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
    //initiate login
    if (this.theForm.valid) {
      //only if form is valid executed
      this.spinner.show(); //show spinner
      const authReq: AuthRequest = this.theForm.value; //construct a request DTO

      this.authService.authenticateUser(authReq).subscribe((data: any) => {
        //call the login endpoind in the Spring Boot Backend
        if (data.body.response.code === 200 && data.body.user_info) {
          //if the response body has a OK response code and a valid User Object
          const loggedInUser: User = data.body.user_info;
          console.log(loggedInUser);
          this.authService.guideToModule(loggedInUser); //redirect the user to their components
          this.modalRef.hide();
        }
        this.spinner.hide();
      }, (error) => {
        //if error, halt process and stop spinner
        console.log(error);
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
