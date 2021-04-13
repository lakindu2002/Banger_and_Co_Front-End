import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment.prod";
import { AuthRequest } from "../models/AuthRequest.model";
import { tap } from 'rxjs/operators';
import { User } from "../models/user.model";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root" //provides singleton access
})
export class AuthService {
  private baseURL: string = `${environment.apiBaseUrl}/api/guest`;

  constructor(private http: HttpClient, private router: Router) { }

  authenticateUser(user: AuthRequest) {
    return this.http.post(`${this.baseURL}/login`, user, {
      observe: "response"
    }).pipe(tap((data: any) => {
      if (data.body) {
        //attach the user obj to session storage
        sessionStorage.setItem(environment.userInfoStorage, JSON.stringify(data.body.user_info));
      }

      if (data.headers.get("Authorization")) {
        //attach jwt token to session storage
        sessionStorage.setItem(environment.tokenStorage, data.headers.get("Authorization"));
      }
    }));
  }

  guideToModule(loggedInUser: User) {
    switch (loggedInUser.userRole.toLowerCase()) {
      case environment.customerRole: {
        this.router.navigate(['/customer']);
        break;
      }
      case environment.administratorRole: {
        break;
      }
    }
  }

  logout() {
    //clear user info and token from session storage
    sessionStorage.removeItem(environment.tokenStorage);
    sessionStorage.removeItem(environment.userInfoStorage)

    this.router.navigate(["/"]);
  }
}
