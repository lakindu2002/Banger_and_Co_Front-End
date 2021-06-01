import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { LocalStorageService } from "./localstorage.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  //guard used to provide access to role based authentication

  constructor(
    private authService: AuthService,
    private localStorageService: LocalStorageService,
    private router: Router,
    private toast: ToastrService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    const isLoggedIn = this.authService.isLoggedIn(); //check if user is logged in
    const user = this.localStorageService.getUserInLocalStorage(); //retrieve logged in user


    if (user && isLoggedIn === true) {
      const role: string = user.userRole;
      if (route.url[0].path === "customer" && role === "customer") {
        //if user role is customer and base path is "customer", give access
        return true;
      } else if (route.url[0].path === "admin" && role === "administrator") {
        //else check if path is admin and role is administrator, give access
        return true;
      } else if (role === "customer") {
        this.router.navigate(['/customer']);
      } else if (role === "administrator") {
        this.router.navigate(['/admin']);
      }
    } else {
      if (route.url[0].path === "customer" || route.url[0].path === "admin") {
        this.toast.error("You cannot view this resource without being authenticated","Access Denied");
        this.authService.clearLocalStorage();
        this.router.navigate(['/']); //if user tries to access protected route while logged out, deny acceess
        return false;
      } else {
        return true; //if the user tries to access an unprotected route while being logged out
      }
    }

  }
}
