import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment.prod";
import { ResponseAPI } from "../models/response.model";
import { UpdateVehicle } from "../models/update.vehicle.model";
import { Vehicle } from "../models/vehicle.model";
import { VehicleRentalFilter } from "../models/vehicle_rental_filter.model";

@Injectable({
  providedIn: "root"
}
  //injectable enables other services to be injected to this
)
export class VehicleService {
  customerClickedRent: Subject<Vehicle> = new Subject();
  baseUrl: string = `${environment.apiBaseUrl}/api/vehicle`;
  imageBase: string = environment.imageBase;

  constructor(private http: HttpClient) { }

  createVehicle(theVehicle: FormData): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(`${this.baseUrl}/create`, theVehicle);
  }

  getAllVehicles(): Observable<Vehicle[]> {
    //it will still return a Javacsript object converted from JSON but will not map to Vehicle.
    //if in ts, its vehicleType and in backend its theType, output will still be theType, not vehicleType.
    return this.http.get<Vehicle[]>(`${this.baseUrl}/all`).pipe(map((vehicleList => {
      //change the vehicle image to add the format before going back to component.
      vehicleList.forEach((eachVehicle) => {
        //for each vehicle, add the base 64 identifier
        eachVehicle.vehicleImage = `${this.imageBase}${eachVehicle.vehicleImage}`
      })
      return vehicleList; //the the formatted list.
    })))
  }

  getRentableVehiclesForFilter(theFilter: VehicleRentalFilter): Observable<Vehicle[]> {
    const query = `pickupDate=${theFilter.pickupDate}&returnDate=${theFilter.returnDate}
    &pickupTime=${theFilter.pickupTime}&returnTime=${theFilter.returnTime}`;

    return this.http.get<Vehicle[]>(`${this.baseUrl}/getRentableVehicles?${query}`).pipe(map((data) => {
      data.forEach((eachVehicle) => {
        eachVehicle.vehicleImage = `${environment.imageBase}${eachVehicle.vehicleImage}`
      })
      return data;
    }))
  }

  removeVehicle(id: number): Observable<ResponseAPI> {
    return this.http.delete<ResponseAPI>(`${this.baseUrl}/remove/${id}`);
  }

  getVehicleByLicensePlate(vehicleId: number): Observable<Vehicle> {
    return this.http.get<Vehicle>(`${this.baseUrl}/get/${vehicleId}`).pipe(map((theVehicle) => {
      theVehicle.vehicleImage = `${environment.imageBase}${theVehicle.vehicleImage}`
      return theVehicle;
    }));
  }

  updateVehicle(updateObj: UpdateVehicle, theNewImage: File): Observable<ResponseAPI> {
    const formData = new FormData();
    formData.append("updateInfo", JSON.stringify(updateObj));
    if (theNewImage) {
      formData.append("newPicture", theNewImage);
    }
    return this.http.put<ResponseAPI>(`${this.baseUrl}/update`, formData);
  }
}
