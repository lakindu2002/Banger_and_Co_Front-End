import { Rental } from "./rental.model";
import { VehicleType } from "./vehicleType.model";

export interface Vehicle {
  vehicleId: number;
  licensePlate: string,
  vehicleName: string;
  fuelType: string;
  transmission: string;
  vehicleImage: File | string;
  vehicleType: VehicleType;
  theRentalsForVehicle: Rental;
}
