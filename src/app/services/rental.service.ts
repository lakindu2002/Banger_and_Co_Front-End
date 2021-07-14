import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
}
