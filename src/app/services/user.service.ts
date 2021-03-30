import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { User } from "../models/user.model";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private APIURL: String = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }
}
