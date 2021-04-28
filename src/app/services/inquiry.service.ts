import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { Inquiry } from "../models/inquiry.model";

@Injectable({
  providedIn: "root"
})
export class InquiryService {
  private APIUrl: string = `${environment.apiBaseUrl}/api/inquiry`;

  constructor(private http: HttpClient) { }

  createInquiry(inquiry: Inquiry): Observable<any> {
    return this.http.post(`${this.APIUrl}/createInquiry`, inquiry);
  }

  getAllPendingInquiries(): Observable<Inquiry[]> {
    return this.http.get<Inquiry[]>(`${this.APIUrl}/all`)
  }
}
