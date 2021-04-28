export interface Inquiry {
  firstName: string;
  lastName: string;
  inquirySubject: string;
  message: string;
  emailAddress: string;
  contactNumber: string;
  inquiryId?:number;
  createdAt?:number;
  resolvedByUsername?:string;
  replied?:boolean
}
