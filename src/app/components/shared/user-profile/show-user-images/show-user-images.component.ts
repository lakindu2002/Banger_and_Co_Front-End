import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { ResponseAPI } from 'src/app/models/response.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-show-user-images',
  templateUrl: './show-user-images.component.html',
  styleUrls: ['./show-user-images.component.css']
})
export class ShowUserImagesComponent implements OnInit {

  username: string;
  showingState: string;
  imageUrl: string | ArrayBuffer;
  newLoaded: boolean = false;
  newLoadedFile: File;

  constructor(private modalRef: BsModalRef, private userService: UserService, private toast: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.spinner.show();
    if (this.showingState.toLowerCase() === 'license') {
      this.userService.getLicenseImage(this.username).subscribe((data) => {
        this.readImage(data);
      }, (error: ErrorResponse) => {
        this.toast.error(error.exceptionMessage, "Failed to Load License Image")
        this.spinner.hide();
      })
    } else {
      this.userService.getOtherIdentity(this.username).subscribe((data) => {
        this.readImage(data);
      }, (error) => {
        this.toast.error(error.exceptionMessage, "Failed to Load Other Identity Image")
        this.spinner.hide();
      })
    }
  }

  readImage(image: Blob) {
    const reader: FileReader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = () => {
      this.imageUrl = reader.result;
      this.spinner.hide();
    }
  }

  hideModal() {
    this.modalRef.hide();
  }


  loadNewImage(loadedFile: File) {
    if (loadedFile.size > (1024000 * 5)) {
      //file size exceeded as greater than 5
      this.toast.error("Please keep the new image to 5MB or less", "Maximum File Size Exceeded");
    } else {
      this.newLoaded = true;
      this.newLoadedFile = loadedFile;
      this.readImage(loadedFile);
    }
  }

  saveImage() {
    this.spinner.show();
    if (this.showingState.toLowerCase() === 'license') {
      //update license image
      this.userService.updateCustomerLicenseImage(this.username, this.newLoadedFile).subscribe((data: ResponseAPI) => {
        this.spinner.hide();
        this.toast.success(data.message, "License Image Saved")
        this.hideModal();
      }, (error: ErrorResponse) => {
        this.toast.error(error.exceptionMessage, "Failed to Update License Image")
        this.spinner.hide();
      });
    } else {
      //update additional image
      this.userService.updateCustomerOtherIdentityImage(this.username, this.newLoadedFile).subscribe((data: ResponseAPI) => {
        this.spinner.hide();
        this.toast.success(data.message, "Other Identity Image Saved")
        this.hideModal();
      }, (error: ErrorResponse) => {
        this.toast.error(error.exceptionMessage, "Failed to Update Other Identity Image")
        this.spinner.hide();
      });
    }
  }

}
