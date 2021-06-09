import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment.prod";
import { ResponseAPI } from "../models/response.model";
import { Vehicle } from "../models/vehicle.model";

@Injectable({
  providedIn: "root"
}
  //injectable enables other services to be injected to this
)
export class VehicleService {
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
}