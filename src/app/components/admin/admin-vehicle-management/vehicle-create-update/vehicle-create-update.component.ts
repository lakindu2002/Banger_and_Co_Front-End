import { Component, OnDestroy, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-vehicle-create-update',
  templateUrl: './vehicle-create-update.component.html',
  styleUrls: ['./vehicle-create-update.component.css']
})
export class VehicleCreateUpdateComponent implements OnInit, OnDestroy {

  vehicleImageUrl: string | ArrayBuffer;
  loadedImage: File
  fileSizeExceeded: boolean = false;

  //can access the open modal via injecting the modal ref since it was opened with the "show" method of modal service
  constructor(private modalRef: BsModalRef, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  }

  hideModal() {
    this.modalRef.hide();
  }

  processFormSubmit() {
    console.log("executed submit");
  }

  loadPicture(selectedFile: File) {
    this.spinner.show('imageSpinner');
    this.fileSizeExceeded = false;
    this.vehicleImageUrl = undefined;
    this.loadedImage = undefined;

    if (selectedFile.size > (5 * 1024 * 1024)) {
      //if image is greater than 5 mb
      this.fileSizeExceeded = true;
      this.spinner.hide('imageSpinner');
    } else {
      const theReader = new FileReader(); //create a file reader to display a preivew of the image to the user
      theReader.readAsDataURL(selectedFile); //get the image as a base 64

      theReader.onload = () => {
        //once the image has been finished reading as a data url
        this.vehicleImageUrl = theReader.result;
        this.loadedImage = selectedFile;
        this.spinner.hide('imageSpinner');
      }
    }
  }

  handleNewTypeCreation():void{
    this.spinner.show('typeCreator');
    // this.spinner.hide('typeCreator');
    console.log("EXECUTED TYPE CREATION")
  }

  ngOnDestroy(): void {
    //clean up
    this.spinner.hide('imageSpinner');
    this.spinner.hide('typeCreator');
  }

}
