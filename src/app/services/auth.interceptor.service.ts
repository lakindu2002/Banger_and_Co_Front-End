import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { Observable, throwError } from "rxjs";
import { catchError } from "rxjs/operators";
import { environment } from "src/environments/environment.prod";
import { ErrorResponse } from "../models/errorresponse.model";
import { LocalStorageService } from "./localstorage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  //this class is used to intercept the http requests sent to add the auth token for the server
  //this will exclude non auth request

  constructor(private localStorage: LocalStorageService, private modalService: BsModalService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    //req is the current sending request
    //next is the function that forwards the request
    //before the request goes to "subscribe" this is executed

    const reqUrl: string = req.url;
    const endpoint: string = reqUrl.substring(environment.apiBaseUrl.length);

    if (!endpoint.startsWith("/api/auth") || endpoint === "/api/inquiry/createInquiry") {
      const tokenToBeAttached = this.localStorage.getToken();
      if (tokenToBeAttached) {
        req = req.clone({
          headers: req.headers.append("Authorization", tokenToBeAttached),
        })
      }
    }
    return next.handle(req).pipe(catchError((error: HttpErrorResponse) => {
      //listen to the error channel of the source observable and throw the errors
      let exceptionMessage = "";
      let errorMessage = "";
      let multipleErrors = [];

      let errorObj: ErrorResponse;
      if (error.error) {
        errorObj = error.error;
      } else {
        errorObj = {
          exceptionMessage: "An Error Occurred While Processing Your Request",
          message: "An Error Occurred While Processing Your Request",
          multipleErrors: [],
          errorCode: 0,
        }
      }

      switch (error.status) {
        case 500: {
          //internal error
          exceptionMessage = errorObj.exceptionMessage;
          errorMessage = errorObj.exceptionMessage;
          break;
        }
        case 400: {
          //bad input passed
          exceptionMessage = errorObj.exceptionMessage;
          errorMessage = errorObj.message;
          multipleErrors = errorObj.multipleErrors;
          break;
        }
        case 404: {
          //api request url not found
          exceptionMessage = errorObj.exceptionMessage;
          errorMessage = errorObj.exceptionMessage;
          break;
        }
        case 401: {
          //authentication error
          errorMessage = "Your session is not valid. Please login again to continue using the application";
          exceptionMessage = "Your session is not valid. Please login again to continue using the application";
          break;
        }
        case 403: {
          //forbidden
          errorMessage = "You do not have the permission to view this resource";
          exceptionMessage = "You do not have the permission to view this resource";
          break;
        }
        case 409: {
          //conflict request
          errorMessage = errorObj.exceptionMessage;
          exceptionMessage = errorObj.exceptionMessage;
          break;
        }
        default: {
          //server down
          errorObj.errorCode = 0;
          errorMessage = "We ran in to an unexpected error. Please try again in a bit."
          exceptionMessage = "We ran in to an unexpected error. Please try again in a bit."
          break;
        }
      }

      const errorReturn: ErrorResponse = {
        errorCode: errorObj.errorCode,
        exceptionMessage: exceptionMessage,
        message: errorMessage,
        multipleErrors: multipleErrors,
      }

      return throwError(errorReturn); //emit an error notification in the observable that will go and be caught in the (error) method in the subscription
    }));
  }
}
