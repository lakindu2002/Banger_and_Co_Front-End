import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { AuthRequest } from "../models/AuthRequest.model";
import { map, tap } from 'rxjs/operators';
import { User } from "../models/user.model";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { LocalStorageService } from "./localstorage.service";

@Injectable({
  providedIn: "root" //provides singleton access
})
export class AuthService {
  private baseURL: string = `${environment.apiBaseUrl}/api/auth`;

  constructor(private http: HttpClient, private router: Router, private localStorageService: LocalStorageService) { }

  createAccount(theUser: FormData) {
    return this.http.post<any>(`${this.baseURL}/createAccount`, theUser);
  }

  authenticateUser(user: AuthRequest): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, user, {
      observe: "response"
    }).pipe(tap((data: any) => {
      if (data.body) {
        //attach the user obj to local storage
        this.localStorageService.setUserInLocalStorage(data.body.user_info);
      }

      if (data.headers.get("Authorization")) {
        //attach jwt token to local storage
        this.localStorageService.setToken(data.headers.get("Authorization"))
      }

      if (data.headers.get("Token-Expiry")) {
        //attach jwt token to session storage
        this.localStorageService.setTokenExpiry(data.headers.get("Token-Expiry"));
      }
    }), map((data: any) => {
      return data.body;
    }));
  }

  guideToModule(loggedInUser: User): void {
    switch (loggedInUser.userRole.toLowerCase()) {
      case environment.customerRole: {
        this.router.navigate(['/customer']);
        break;
      }
      case environment.administratorRole: {
        this.router.navigate(['/admin'])
        break;
      }
    }
  }

  logout(): void {
    //clear user info and token from local storage
    this.clearLocalStorage();

    this.router.navigate(["/"]);
  }

  clearLocalStorage(): void {
    if (localStorage.getItem(environment.tokenStorage)) {
      localStorage.removeItem(environment.tokenStorage);
    }
    if (localStorage.getItem(environment.userInfoStorage)) {
      localStorage.removeItem(environment.userInfoStorage)
    }
    if (localStorage.getItem(environment.tokenExpiration)) {
      localStorage.removeItem(environment.tokenExpiration)
    }
  }

  isLoggedIn(): boolean {
    const token: string = this.localStorageService.getToken();
    const tokenExpiration: string = this.localStorageService.getExpiry();

    if (token && tokenExpiration) {
      //if token starts with "Bearer " and is not expired return true
      return token.startsWith("Bearer ") && Number.parseInt(tokenExpiration) > new Date().getTime();
    } else {
      //if token is not present in local storage, do not give access
      return false;
    }
  }
}
