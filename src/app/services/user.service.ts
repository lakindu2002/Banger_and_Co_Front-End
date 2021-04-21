import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment.prod";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  //service class setup to handle all the user endpoints of the backend
  private baseURL: string = `${environment.apiBaseUrl}/api/user`

  constructor(private http: HttpClient) { }

  getUserInformation(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/userInformation/${username}`);
  }
}
