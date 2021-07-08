export interface User {
  username: string,
  emailAddress: string,
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  userPassword?: string,
  contactNumber: string,
  profilePicture?: File | string,
  licensePic?: File | string,
  otherIdentity?: File | string,
  blackListed?: boolean,
  userRole?: string,
  drivingLicenseNumber?: string;
}
