import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { AdditionalEquipment } from "../models/equipment.model";
import { ResponseAPI } from "../models/response.model";

@Injectable({
  providedIn: 'root'
})
export class EquipmentService {
  private equipmentEndpoint: string = `${environment.apiBaseUrl}/api/equipment`;

  //angular provided HttpClient module to send http requests
  constructor(private http: HttpClient) { }

  createAdditionalEquipment(theInformation: AdditionalEquipment): Observable<ResponseAPI> {
    //an observable with the ResponseAPI response body will be returned.
    return this.http.post<ResponseAPI>(
      `${this.equipmentEndpoint}/create`, theInformation
    );
  }

  getAll(): Observable<AdditionalEquipment[]> {
    return this.http.get<AdditionalEquipment[]>(`${this.equipmentEndpoint}/all`);
  }

  getById(equipmentId: number): Observable<AdditionalEquipment> {
    return this.http.get<AdditionalEquipment>(`${this.equipmentEndpoint}/get/${equipmentId}`);
  }

  updateEquipment(updatePasser: AdditionalEquipment): Observable<ResponseAPI> {
    return this.http.put<ResponseAPI>(`${this.equipmentEndpoint}/update`, updatePasser);
  }

  removeById(equipmentId: number): Observable<ResponseAPI> {
    return this.http.delete<ResponseAPI>(`${this.equipmentEndpoint}/remove/${equipmentId}`);
  }
}
