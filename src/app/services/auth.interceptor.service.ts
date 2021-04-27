import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment.prod";
import { LocalStorageService } from "./localstorage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  //this class is used to intercept the http requests sent to add the auth token for the server
  //this will exclude non auth request

  constructor(private localStorage: LocalStorageService, private spinner : NgxSpinnerService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //req is the current sending request
    //next is the function that forwards the request
    //before the request goes to "subscribe" this is executed

    const reqUrl: string = req.url;
    const endpoint: string = reqUrl.substring(environment.apiBaseUrl.length);

    if (endpoint.startsWith("/api/auth") || endpoint === "/api/inquiry/createInquiry") {
      return next.handle(req); //if the endpoints do not need authentication, allow the request
    } else {
      const tokenToBeAttached = this.localStorage.getToken();

      if (tokenToBeAttached) {
        const theClonedRequest: HttpRequest<any> = req.clone({
          headers: req.headers.append("Authorization", tokenToBeAttached),
        })
        //pass the request accross the chain and goes to "subscribe"
        //return allows it to proceed and lets the request leave the app

        //handle exceptions in the pipe
        return next.handle(theClonedRequest).pipe(catchError((error:HttpErrorResponse)=>{
          console.log(error);
          if (error.status === 404) {
            console.log("resource not found");
          } else if (error.status === 403) {
            console.log("unauthorized");
          } else if (error.status >= 500) {
            console.log("internal server")
          } else {
            console.log("unknown error")
          }
          return throwError(error);
        }));

      }
    }
  }

}
