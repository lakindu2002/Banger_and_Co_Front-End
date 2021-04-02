import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private APIURL: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  createAccount(theUser: FormData) {
    return this.http.post<any>(`${this.APIURL}/api/guest/createAccount`, theUser);
  }
}
