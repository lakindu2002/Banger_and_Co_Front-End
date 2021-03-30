import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { Inquiry } from "../models/inquiry.model";

@Injectable({
  providedIn: "root"
})
export class InquiryService {
  private APIUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  createInquiry(inquiry: Inquiry) {
    return this.http.post(`${this.APIUrl}/api/guest/createInquiry`, inquiry);
  }
}
