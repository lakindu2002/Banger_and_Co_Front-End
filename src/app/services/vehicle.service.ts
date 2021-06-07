import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
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

  constructor(private http: HttpClient) { }

  createVehicle(theVehicle: FormData): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(`${this.baseUrl}/create`, theVehicle);
  }

  getAllVehicles(): Observable<Vehicle[]> {
    return this.http.get<Vehicle[]>(`${this.baseUrl}/all`);
  }
}
