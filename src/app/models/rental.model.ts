import { AdditionalEquipment } from "./equipment.model";
import { Vehicle } from "./vehicle.model";

export interface Rental {
  pickupDate: string,
  returnDate: string,
  pickupTime: string,
  returnTime: string,
  vehicleToBeRented: number | Vehicle;
  totalCostForRental: number
  equipmentsAddedToRental: AdditionalEquipment[],
  customerUsername: string;
}
