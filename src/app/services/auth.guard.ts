import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { LocalStorageService } from "./localstorage.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  //guard used to provide access to role based authentication

  constructor(private authService: AuthService, private localStorageService: LocalStorageService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isLoggedIn = this.authService.isLoggedIn();
    const user = this.localStorageService.getUserInLocalStorage();

    if (isLoggedIn === false && !user) {
      if (route.url[0].path === "customer" || route.url[0].path === "admin") {
        return false;
      } else {
        return true;
      }
    } else {
      if (user && isLoggedIn === true) {
        const role: string = user.userRole;
        if (route.url[0].path !== "customer" && role === "customer") {
          this.router.navigate(['/customer']);
          return false;
        } else if (route.url[0].path === "admin" && role === "administrator") {
          this.router.navigate(['/admin']);
          return false;
        } else if (route.url[0].path === "customer" && role === "customer") {
          //if user role is customer and base path is "customer", give access
          return true;
        } else if (route.url[0].path === "admin" && role === "administrator") {
          //else check if path is admin and role is administrator, give access
          return true;
        }
      } else {
        this.router.navigate(['/']);
        return false;
      }
    }
  }
}
