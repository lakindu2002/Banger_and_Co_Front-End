import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { ResponseAPI } from "../models/response.model";
import { VehicleType } from "../models/vehicleType.model";

@Injectable(
  //allow other services to be injected to this.
  {
    providedIn: 'root' //provide same instance for app level.
  }
)
export class VehicleTypeService {
  basePath: string = `${environment.apiBaseUrl}/api/vehicleType`

  constructor(private http: HttpClient) { }

  getAllVehicleTypes(): Observable<VehicleType[]> {
    return this.http.get<VehicleType[]>(`${this.basePath}/findAll`);
  }

  createVehicleType(theCreator: VehicleType): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(`${this.basePath}/create`, theCreator);
  }

  findById(id: number): Observable<VehicleType> {
    //observe for a response of VehicleType from the backend
    return this.http.get<VehicleType>(`${this.basePath}/find/${id}`);
  }

  removeById(id: number): Observable<ResponseAPI> {
    return this.http.delete<ResponseAPI>(`${this.basePath}/remove/${id}`);
  }

  updateVehicleType(theType: VehicleType): Observable<ResponseAPI> {
    return this.http.put<ResponseAPI>(`${this.basePath}/update`, theType);
  }
}
