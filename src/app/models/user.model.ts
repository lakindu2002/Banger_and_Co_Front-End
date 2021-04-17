export interface User {
  username: string,
  emailAddress: string,
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  userPassword?: string,
  contactNumber: string,
  profilePicture?: File | string,
  isBlackListed?: boolean,
  userRole?: string
}
