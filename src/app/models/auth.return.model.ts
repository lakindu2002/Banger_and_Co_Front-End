export interface AuthReturn {
  //interface defines the shape of an API
  firstName: string;
  lastName: string;
  profilePicture: File | string;
  userRole: string;
  username: string;
  dateOfBirth: string;
  blacklisted?: boolean;
}
