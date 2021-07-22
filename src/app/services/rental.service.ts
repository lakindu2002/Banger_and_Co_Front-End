import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Rental } from '../models/rental.model';
import { Observable } from 'rxjs';
import { ResponseAPI } from '../models/response.model';
import { environment } from 'src/environments/environment.prod';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class RentalService {
  baseEndpoint: string = `${environment.apiBaseUrl}/api/rental`;

  constructor(private http: HttpClient) { }

  makeRental(theRental: Rental): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(`${this.baseEndpoint}/makeRental`, theRental);
  }

  getAllPendingRentals(pageNumber: number): Observable<{ nextPageNumber: number, thePendingRentals: Rental[] }> {
    //pass a query parameter to indiciate the page number to get the data for.
    //will return data in ascending order of pickup date.
    return this.http.get<{ nextPageNumber: number, thePendingRentals: Rental[] }>(`${this.baseEndpoint}/find/pendingRentals`, {
      params: new HttpParams().append("pageNumber", pageNumber.toString())
    });
  }

  getRentalById(rentalId: number): Observable<Rental> {
    return this.http.get<Rental>(`${this.baseEndpoint}/find/${rentalId}`).pipe(map((theRental) => {
      //assign the image base
      theRental.customerUsername.profilePicture = `${environment.imageBase}${theRental.customerUsername.profilePicture}`
      theRental.customerUsername.otherIdentity = `${environment.imageBase}${theRental.customerUsername.otherIdentity}`
      theRental.customerUsername.licensePic = `${environment.imageBase}${theRental.customerUsername.licensePic}`
      theRental.vehicleToBeRented.vehicleImage = `${environment.imageBase}${theRental.vehicleToBeRented.vehicleImage}`

      return theRental;
    }))
  }

  rejectRental(rentalId: number, rejectedReason: string): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(`${this.baseEndpoint}/handle/reject`, { rentalId: rentalId, rejectedReason: rejectedReason });
  }
  approveRental(rentalId: number) {
    return this.http.post<ResponseAPI>(`${this.baseEndpoint}/handle/approve`, { rentalId: rentalId });
  }

}
