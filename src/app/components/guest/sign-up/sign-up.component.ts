import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  loadedImage: any;
  imageUrl: string | ArrayBuffer;
  imageLoaded: boolean = false;

  maxDate: Date;

  constructor(private modalRef: BsModalRef, private modalService: BsModalService) { }

  ngOnInit(): void {
    this.maxDate = new Date();
  }

  closeModal() {
    this.modalRef.hide();
  }

  fileLoaded(fileSelected) {
    if (fileSelected) {
      this.imageLoaded = false;
      const reader = new FileReader(); //create a file reader
      reader.readAsDataURL(fileSelected); //read the image into a url

      reader.onload = (() => {
        //once it is loaded as a url
        this.imageLoaded = true;
        this.imageUrl = reader.result;
        this.loadedImage = fileSelected;
      })
    }
  }
}
