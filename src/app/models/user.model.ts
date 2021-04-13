import { UserRole } from "./userrole.model";

export interface User {
  emailAddress: string,
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  userPassword?: string,
  contactNumber: string,
  profilePicture?: File | string,
  isBlackListed?: boolean,
  userRole?: UserRole
}
