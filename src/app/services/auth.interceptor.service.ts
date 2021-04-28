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
      let headerMessage = "";
      let exceptionMessage = "";
      let errorMessage = "";
      let multipleErrors = [];

      let errorObj: ErrorResponse;
      if (error.error) {
        errorObj = error.error;
      } else {
        errorObj = {
          exceptionMessage: "Internal Server Error",
          message: "An Error Occurred While Processing Your Request",
          multipleErrors: [],
          errorCode: 0,
          header: "An Error Occured"
        }
      }

      switch (error.status) {
        case 500: {
          headerMessage = "Internal Error Occured";
          exceptionMessage = errorObj.exceptionMessage;
          errorMessage = errorObj.message;
          break;
        }
        case 400: {
          headerMessage = "Fields Were Badly Formatted"
          exceptionMessage = "Please ensure that you provide data of valid format";
          errorMessage = errorObj.message;
          multipleErrors = errorObj.multipleErrors;
          break;
        }
        case 404: {
          headerMessage = "Resource Not Found";
          exceptionMessage = errorObj.exceptionMessage;
          errorMessage = errorObj.message;
          break;
        }
        case 401: {
          headerMessage = "Authentication Error Occured";
          errorMessage = "Your session is not valid. Please login again to continue using the application";
          break;
        }
        case 403: {
          headerMessage = "Authorization Error Occured";
          errorMessage = "You do not have the permission to view this resource";
          break;
        }
        case 409: {
          errorMessage = errorObj.message;
          exceptionMessage = errorObj.exceptionMessage;
          break;
        }
        default: {
          errorObj.errorCode = 0;
          headerMessage = "Unknown Error Occured";
          errorMessage = "We ran in to an unexpected error. Please try again in a bit."
          break;
        }
      }

      const errorReturn: ErrorResponse = {
        errorCode: errorObj.errorCode,
        exceptionMessage: exceptionMessage,
        message: errorMessage,
        multipleErrors: multipleErrors,
        header: headerMessage
      }

      return throwError(errorReturn);
    }));
  }
}
