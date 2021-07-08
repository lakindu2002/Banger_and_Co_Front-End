export interface AdditionalEquipment {
  equipmentId?: number;
  equipmentName: String;
  equipmentQuantity: number;
  pricePerDay: string;

  //used to indiciate add ons of the item added in rental.
  quantitySelectedForRental?: number;
}
