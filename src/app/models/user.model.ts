export interface User {
  emailAddress: string,
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  userPassword: string,
  contactNumber: string,
  profilePicture?: File,
  isBlackListed?: boolean,
}
