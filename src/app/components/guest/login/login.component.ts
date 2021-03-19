import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  theForm: FormGroup;
  roleList: string[] = ["guest", "administrator"];

  constructor(private modalRef: BsModalRef) { }

  ngOnInit(): void {
    this.theForm = new FormGroup({
      'emailAddress': new FormControl(null, [Validators.required, Validators.email]),
      'password': new FormControl(null, [Validators.required, Validators.minLength(6)]),
      'selectedRole': new FormControl('guest', [Validators.required]),
    });
  }

  closeModal() {
    this.modalRef.hide();
  }

  handleLogin() {
    if (this.theForm.valid) {
      console.log(this.theForm.value);
    }
  }

}
