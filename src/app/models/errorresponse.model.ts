export interface ErrorResponse {
  errorCode: number;
  exceptionMessage: string;
  message: string;
  multipleErrors: { error: string, message: string }[];
  header?:string
}
