import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { AuthReturn } from "../models/auth.return.model";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class LocalStorageService {
  constructor() { }

  setUserInLocalStorage(theUser: User): void {
    localStorage.setItem(environment.userInfoStorage, JSON.stringify(theUser));
  }

  setToken(theToken: string) {
    localStorage.setItem(environment.tokenStorage, theToken);
  }

  setTokenExpiry(theTime: string) {
    localStorage.setItem(environment.tokenExpiration, theTime);
  }

  getUserInLocalStorage(): AuthReturn {
    if (localStorage.getItem(environment.userInfoStorage)) {
      return JSON.parse(localStorage.getItem(environment.userInfoStorage));
    } else {
      return null;
    }
  }

  getToken(): string {
    if (localStorage.getItem(environment.tokenStorage)) {
      return localStorage.getItem(environment.tokenStorage);
    } else {
      return null;
    }
  }

  getExpiry(): string {
    if (localStorage.getItem(environment.tokenExpiration)) {
      return localStorage.getItem(environment.tokenExpiration);
    } else {
      return null;
    }
  }
}

