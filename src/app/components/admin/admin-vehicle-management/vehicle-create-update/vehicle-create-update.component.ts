import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { VehicleType } from 'src/app/models/vehicleType.model';
import { VehicleTypeService } from 'src/app/services/vehicleType.service';

@Component({
  selector: 'app-vehicle-create-update',
  templateUrl: './vehicle-create-update.component.html',
  styleUrls: ['./vehicle-create-update.component.css']
})
export class VehicleCreateUpdateComponent implements OnInit, OnDestroy {

  @ViewChild('assignReference', { static: true }) assigningBtn: ElementRef;

  vehicleImageUrl: string | ArrayBuffer;
  loadedImage: File
  fileSizeExceeded: boolean = false;

  vehicleTypeList: VehicleType[] = [];

  vehicleTypeCreator: FormGroup;

  //can access the open modal via injecting the modal ref since it was opened with the "show" method of modal service
  constructor(
    private modalRef: BsModalRef,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private vehicleTypeService: VehicleTypeService
  ) { }

  ngOnInit(): void {
    this.constructVehicleTypeForm();
    this.getAllVehicleTypes();
  }

  constructVehicleTypeForm(): void {
    this.vehicleTypeCreator = new FormGroup({
      "typeName": new FormControl(null, [Validators.maxLength(50), Validators.required]),
      "categorySize": new FormControl("small", Validators.required),
      "pricePerDay": new FormControl(null, Validators.required),
    });
  }

  getAllVehicleTypes(): void {
    this.vehicleTypeService.getAllVehicleTypes().subscribe((data) => {
      this.vehicleTypeList = data;
    }, (error) => {
      this.toast.error("The vehicle types could not be loaded. Please try again", "Vehicle Types Not Loaded");
    })
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

  handleNewTypeCreation(): void {
    this.spinner.show('typeCreator');

    const passer: VehicleType = {
      pricePerDay: this.vehicleTypeCreator.get('pricePerDay').value,
      size: this.vehicleTypeCreator.get('categorySize').value,
      typeName: this.vehicleTypeCreator.get('typeName').value
    }

    this.vehicleTypeService.createVehicleType(passer).subscribe((data) => {
      this.vehicleTypeCreator.reset();
      this.vehicleTypeCreator.patchValue({
        "categorySize": 'small',
      }); //clear form data
      this.assigningBtn.nativeElement.click(); //hide the drop down

      this.toast.success("Vehicle type was created successfully. Select it from the dropdown.","Vehicle Type Created")

      this.getAllVehicleTypes();
      this.spinner.hide('typeCreator');
    }, (error: ErrorResponse) => {
      if (error.multipleErrors.length > 0) {
        for (const eachError of error.multipleErrors) {
          this.toast.warning(eachError.message); //error returns name of attribute
        }
      }
      this.toast.error(error.exceptionMessage, "Vehicle Type Not Created")
      this.spinner.hide('typeCreator');
    })
  }

  ngOnDestroy(): void {
    //clean up
    this.spinner.hide('imageSpinner');
    this.spinner.hide('typeCreator');
  }

}
