import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { AuthRequest } from "../models/AuthRequest.model";
import { tap } from 'rxjs/operators';
import { User } from "../models/user.model";
import { Router } from "@angular/router";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root" //provides singleton access
})
export class AuthService {
  private baseURL: string = `${environment.apiBaseUrl}/api/auth`;

  constructor(private http: HttpClient, private router: Router) { }

  createAccount(theUser: FormData) {
    return this.http.post<any>(`${this.baseURL}/createAccount`, theUser);
  }

  authenticateUser(user: AuthRequest): Observable<any> {
    return this.http.post(`${this.baseURL}/login`, user, {
      observe: "response"
    }).pipe(tap((data: any) => {
      if (data.body) {
        //attach the user obj to session storage
        localStorage.setItem(environment.userInfoStorage, JSON.stringify(data.body.user_info));
      }

      if (data.headers.get("Authorization")) {
        //attach jwt token to session storage
        localStorage.setItem(environment.tokenStorage, data.headers.get("Authorization"));
      }

      if (data.headers.get("Token-Expiry")) {
        //attach jwt token to session storage
        localStorage.setItem(environment.tokenExpiration, data.headers.get("Token-Expiry"));
      }
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
    localStorage.removeItem(environment.tokenStorage);
    localStorage.removeItem(environment.userInfoStorage)
    localStorage.removeItem(environment.tokenExpiration)

    this.router.navigate(["/"]);
  }
}
