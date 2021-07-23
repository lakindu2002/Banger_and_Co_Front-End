import { AdditionalEquipment } from "./equipment.model";

export interface Rental {
  rentalId?: number,
  pickupDate: string | Date,
  returnDate: string | Date,
  pickupTime: string,
  returnTime: string,
  vehicleToBeRented: any;
  totalCostForRental: number
  equipmentsAddedToRental: AdditionalEquipment[],
  customerUsername: any;
  approved?: boolean;
  collected?: boolean;
  returned?: boolean;
}
