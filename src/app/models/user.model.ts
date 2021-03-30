export interface User {
  emailAddress: string,
  firstName: string,
  lastName: string,
  dateOfBirth: Date,
  password: string,
  contactNumber: string,
  profilePicture?: File,
  isBlackListed?: boolean,
}
