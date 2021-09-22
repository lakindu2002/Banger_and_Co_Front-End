import { Injectable } from "@angular/core";
import { Subject } from "rxjs";
import { AdditionalEquipment } from "src/app/models/equipment.model";

@Injectable({
  providedIn: 'root'
})
export class RemovalService {
  public removeEquipmentCompletely: Subject<AdditionalEquipment> = new Subject();
}
