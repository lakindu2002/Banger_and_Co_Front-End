import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { AuthRequest } from "../models/AuthRequest.model";
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: "root" //provides singleton access
})
export class AuthService {

  private baseURL: string = `${environment.apiBaseUrl}/api/guest`;

  constructor(private http: HttpClient) { }

  authenticateUser(user: AuthRequest) {
    return this.http.post(`${this.baseURL}/login`, user, {
      observe: "response"
    }).pipe(map((data) => {
      console.log(data.headers);
      if (data.body) {
        sessionStorage.setItem("user_details", JSON.stringify(data.body));
      }

      if (data.headers.get("Authorization")) {
        sessionStorage.setItem("token", data.headers.get("Authorization"));
      }
    }));
  }
}
