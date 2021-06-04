export interface ErrorResponse {
  errorCode: number;
  exceptionMessage: string;
  message: string;
  multipleErrors: { error: string, message: string }[]; //error means the field name that failed the validation.
}
