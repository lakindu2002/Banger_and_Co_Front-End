import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { ErrorResponse } from 'src/app/models/errorresponse.model';
import { ResponseAPI } from 'src/app/models/response.model';
import { VehicleType } from 'src/app/models/vehicleType.model';
import { VehicleService } from 'src/app/services/vehicle.service';
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

  isSuccess: Subject<boolean> = new Subject();

  vehicleTypeList: VehicleType[] = [];

  vehicleTypeCreator: FormGroup;
  vehicleForm: FormGroup;

  //can access the open modal via injecting the modal ref since it was opened with the "show" method of modal service
  constructor(
    private modalRef: BsModalRef,
    private spinner: NgxSpinnerService,
    private toast: ToastrService,
    private vehicleTypeService: VehicleTypeService,
    private vehicleService: VehicleService
  ) { }

  ngOnInit(): void {
    this.constructVehicleForm();
    this.constructVehicleTypeForm();
    this.getAllVehicleTypes();
  }

  constructVehicleForm(): void {
    this.vehicleForm = new FormGroup({
      'licensePlate': new FormControl(null, [Validators.required, Validators.minLength(8), Validators.maxLength(8), Validators.pattern('^[A-Z]{2,3}-[0-9]{4}$')]),
      'vehicleName': new FormControl(null, [Validators.required, Validators.maxLength(125)]), //maximum length of vehicle name is 255 characters
      'fuelType': new FormControl('Petrol', [Validators.required, Validators.maxLength(50)]),
      'transmission': new FormControl('Manual', [Validators.required, Validators.maxLength(50)]),
      'vehicleType': new FormControl(null, [Validators.required]), //patch once api loads the available types.
      'seatingCapacity': new FormControl(0, [Validators.required, Validators.maxLength(3)])
    });
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

      this.vehicleForm.patchValue({
        'vehicleType': data[0].vehicleTypeId
      })

      if (this.vehicleTypeList.length == 0) {
        this.vehicleForm.controls['vehicleType'].disable();
      }
    }, (error) => {
      this.toast.error("The vehicle types could not be loaded. Please try again", "Vehicle Types Not Loaded");
    })
  }

  hideModal() {
    this.modalRef.hide();
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

      this.toast.success("Vehicle type was created successfully. Select it from the dropdown.", "Vehicle Type Created")

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

  createVehicle(): void {
    this.spinner.show();

    //create a Javascript object that can be sent to the server contianing vehicle information excluding file
    const theVehicle = {
      vehicleName: this.vehicleForm.get('vehicleName').value,
      fuelType: this.vehicleForm.get('fuelType').value,
      licensePlate: this.vehicleForm.get('licensePlate').value,
      transmission: this.vehicleForm.get('transmission').value,
      vehicleTypeId: this.vehicleForm.get('vehicleType').value,
      seatingCapacity: this.vehicleForm.get('seatingCapacity').value
    }

    //form data is used as it is not possible to send files in json as files are not blob.
    //to send the WHOLE file the form data is used.
    const passer: FormData = new FormData();
    //pass JSON to the server, since not using actual HTTP client body (one arguement body),
    //JSON conversion does not happen automatically, so we need to manually do it.

    passer.append('vehicleInformation', JSON.stringify(theVehicle)); //convert to JSON (will be de-serialized back to DTO by Spring Boot.)
    passer.append('vehicleImage', this.loadedImage); //attach the entire file to the form.

    //call api endpoint to save vehicle in database
    this.vehicleService.createVehicle(passer).subscribe((data: ResponseAPI) => {
      this.isSuccess.next(true) //denote success to the component subscribed to this subject

      //show success message
      this.toast.success("The vehicle was created successfully at Banger and Co.", "Vehicle Created Successfully");
      this.hideModal(); //hide the modal after successful creation
      this.spinner.hide();
    }, (error: ErrorResponse) => {
      if (error.multipleErrors.length > 0) {
        //validation errors
        for (const eachError of error.multipleErrors) {
          this.toast.warning(eachError.message);
        }
      }
      this.toast.error(error.message, "Vehicle Not Created");
      this.spinner.hide();
    })
  }

  ngOnDestroy(): void {
    //clean up
    this.spinner.hide('imageSpinner');
    this.spinner.hide('typeCreator');
  }

}
