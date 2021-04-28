export interface Inquiry {
  firstName: string;
  lastName: string;
  inquirySubject: string;
  message: string;
  emailAddress: string;
  contactNumber: string;
  inquiryId?:number;
  createdAt?:string;
  resolvedByUsername?:string;
  replied?:boolean
}
