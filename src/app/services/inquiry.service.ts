import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { ErrorHandlerAPI } from "../models/error.model";
import { Inquiry } from "../models/inquiry.model";

@Injectable({
  providedIn: "root"
})
export class InquiryService {
  private APIUrl: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  createInquiry(inquiry: Inquiry): Observable<Response | ErrorHandlerAPI> {
    return this.http.post<Response | ErrorHandlerAPI>(this.APIUrl, inquiry);
  }
}
