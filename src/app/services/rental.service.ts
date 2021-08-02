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

  getAllApprovedRentals(pageNumber: number) {
    return this.http.get<{ nextPage: number, approvedRentals: Rental[] }>(`${this.baseEndpoint}/find/allApproved`, {
      params: new HttpParams().append("pageNumber", pageNumber.toString())
    });
  }

  getAllRejectedRentals(pageNumber: number) {
    return this.http.get<{ nextPage: number, rejectedRentals: Rental[] }>(`${this.baseEndpoint}/find/allRejected`, {
      params: new HttpParams().append("pageNumber", pageNumber.toString())
    });
  }

  getAllCompletedRentals(pageNumber: number) {
    return this.http.get<{ nextPage: number, allCompleted: Rental[] }>(`${this.baseEndpoint}/find/allCompleted`, {
      params: new HttpParams().append("pageNumber", pageNumber.toString())
    });
  }

  getAllOngoingRentals(pageNumber: number) {
    return this.http.get<{ nextPage: number, allOnGoingRentals: Rental[] }>(`${this.baseEndpoint}/find/allOnGoing`, {
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

  startRental(rentalId: number): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(`${this.baseEndpoint}/handle/startRental`, { rentalId: rentalId });
  }

  completeRental(rentalId: number): Observable<ResponseAPI> {
    return this.http.post<ResponseAPI>(`${this.baseEndpoint}/handle/completeRental`, { rentalId: rentalId });
  }

  getCompletedRentalsForPast12Months(): Observable<{ month: string, count: number, rentals: Rental[] }[]> {
    return this.http.get<{ month: string, count: number, rentals: Rental[] }[]>(`${this.baseEndpoint}/statistics/completedPast12Months`);
  }

  getProfitsForLast12Months(): Observable<{ month: string, count: number, totalForTheMonth: any }[]> {
    return this.http.get<{ month: string, count: number, totalForTheMonth: any }[]>(`${this.baseEndpoint}/statistics/yearlyProfits`)
      .pipe(map((chartData) => {
        chartData.map((eachMonth) => {
          eachMonth.totalForTheMonth = eachMonth.totalForTheMonth.toFixed(2);
        })
        return chartData;
      }));
  }


  getCustomerPendingRentals(username: string, pageNumber: number): Observable<{ nextPage: number, customerPendingRentals: Rental[] }> {
    return this.http.get<{ nextPage: number, customerPendingRentals: Rental[] }>(
      `${this.baseEndpoint}/find/pending/${username}`,
      {
        params: new HttpParams().append("pageNumber", pageNumber.toString())
      });
  }

  getRentalsApprovedForCustomer(username: string, pageNumber: number): Observable<{ nextPage: number, customerCanBeCollectedRentals: Rental[] }> {
    return this.http.get<{ nextPage: number, customerCanBeCollectedRentals: Rental[] }>(
      `${this.baseEndpoint}/find/readyToCollect/${username}`,
      {
        params: new HttpParams().append("pageNumber", pageNumber.toString())
      });
  }

  getPastRentalsForCustomer(username: string, pageNumber: number): Observable<{ nextPage: number, customerCompletedRentals: Rental[] }> {
    return this.http.get<{ nextPage: number, customerCompletedRentals: Rental[] }>(
      `${this.baseEndpoint}/find/completed/${username}`,
      {
        params: new HttpParams().append("pageNumber", pageNumber.toString())
      });
  }

  getOnGoingRentalsForCustomer(username: string, pageNumber: number): Observable<{ nextPage: number, customerOnGoingRentals: Rental[] }> {
    return this.http.get<{ nextPage: number, customerOnGoingRentals: Rental[] }>(
      `${this.baseEndpoint}/find/onGoing/${username}`,
      {
        params: new HttpParams().append("pageNumber", pageNumber.toString())
      });
  }

  getCustomerRejectedRentals(username: string, pageNumber: number): Observable<{ nextPage: number, customerRejectedRentals: Rental[] }> {
    return this.http.get<{ nextPage: number, customerRejectedRentals: Rental[] }>(
      `${this.baseEndpoint}/find/rejected/${username}`,
      {
        params: new HttpParams().append("pageNumber", pageNumber.toString())
      });
  }
}
