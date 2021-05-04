import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment.prod";
import { InquiryReply } from "../models/inquiry-reply.model";
import { Inquiry } from "../models/inquiry.model";
import { ResponseAPI } from "../models/response.model";

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
    return this.http.get<Inquiry[]>(`${this.APIUrl}/all`).pipe((map((data) => {
      let filteredData: Inquiry[] = [];
      data.forEach((eachInquiry) => {
        eachInquiry.createdAt = new Date(eachInquiry.createdAt).getTime();
        filteredData.push(eachInquiry);
      })
      return filteredData;
    })));
  }

  removeInquiry(id: number): Observable<ResponseAPI> {
    return this.http.delete<ResponseAPI>(`${this.APIUrl}/remove/${id}`);
  }

  getDetailedInquiry(id: number): Observable<Inquiry> {
    return this.http.get<Inquiry>(`${this.APIUrl}/find/${id}`);
  }

  replyToInquiry(reply: InquiryReply): Observable<ResponseAPI> {
    return this.http.put<ResponseAPI>(`${this.APIUrl}/reply/`, reply);
  }
}
