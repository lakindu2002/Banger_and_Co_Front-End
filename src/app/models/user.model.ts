export interface User {
  emailAddress: String,
  firstName: String,
  lastName: String,
  dateOfBirth: Date,
  password: String,
  contactNumber: String,
  profilePicture?: File,
  isBlackListed?: Boolean,
}
