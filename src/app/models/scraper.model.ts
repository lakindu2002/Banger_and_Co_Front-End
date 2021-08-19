export interface ScrapeReturn {
  vehicleType: string,
  theVehicleInformation: { vehicleName: string, pricePerMonth: number, pricePerWeek: number, pricePerDay: number }[];
  averagePricePerDay: number,
}
