import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Rental } from '../models/rental.model';
import { Observable } from 'rxjs';
import { ResponseAPI } from '../models/response.model';
import { environment } from 'src/environments/environment.prod';

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
}
