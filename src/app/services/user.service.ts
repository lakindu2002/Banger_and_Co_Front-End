import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import { environment } from "src/environments/environment.prod";
import { ResponseAPI } from "../models/response.model";
import { UserUserModel } from "../models/update.user.model";
import { User } from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class UserService {
  //service class setup to handle all the user endpoints of the backend
  private baseURL: string = `${environment.apiBaseUrl}/api/user`

  constructor(private http: HttpClient) { }

  getUserInformation(username: string): Observable<User> {
    return this.http.get<User>(`${this.baseURL}/userInformation/${username}`);
  }

  updateUserInformation(updateUser: UserUserModel): Observable<any> {
    return this.http.put(`${this.baseURL}/update`, updateUser);
  }

  getAllCustomers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/customers/all`).pipe(map((data) => {
      data.forEach((eachUser) => {
        eachUser.profilePicture = `${environment.imageBase}${eachUser.profilePicture}`
      })
      return data;
    }));
  }

  whiteListCustomer(username: string): Observable<ResponseAPI> {
    const whiteListObject: any = {
      username: username
    }
    return this.http.put<ResponseAPI>(`${this.baseURL}/customer/whitelist`, whiteListObject);
  }

  getOtherIdentity(username: string): Observable<any> {
    return this.http.get(`${this.baseURL}/getOther/${username}`, {
      responseType: 'blob'
    });
  }
  getLicenseImage(username: string): Observable<any> {
    return this.http.get(`${this.baseURL}/getLicense/${username}`, {
      responseType: 'blob'
    });
  }

  updateCustomerOtherIdentityImage(username: string, newLoadedFile: File): Observable<ResponseAPI> {
    const formData: FormData = new FormData();
    formData.append('otherImage', newLoadedFile);
    return this.http.put<ResponseAPI>(`${this.baseURL}/update/otherIdentity/${username}`, formData);
  }
  updateCustomerLicenseImage(username: string, newLoadedFile: File): Observable<ResponseAPI> {
    const formData: FormData = new FormData();
    formData.append('licenseImage', newLoadedFile);
    return this.http.put<ResponseAPI>(`${this.baseURL}/update/license/${username}`, formData);
  }

  getAllAdmins(): Observable<User[]> {
    return this.http.get<User[]>(`${this.baseURL}/admin/getAllAdmins`).pipe(map((data) => {
      data.forEach((eachUser) => {
        eachUser.profilePicture = `${environment.imageBase}${eachUser.profilePicture}`
      })
      return data;
    }));
  }

  createAdministratorAccount(userInfo: User, adminProfilePicture: File): Observable<ResponseAPI> {
    const formData: FormData = new FormData();
    formData.append("userInfo", JSON.stringify(userInfo));
    formData.append("profilePic", adminProfilePicture);
    return this.http.post<ResponseAPI>(`${this.baseURL}/admin/createAdmin`, formData);
  }

  deleteAdministratorAccount(username: string): Observable<ResponseAPI> {
    return this.http.delete<ResponseAPI>(`${this.baseURL}/admin/delete/${username}`);
  }
}
