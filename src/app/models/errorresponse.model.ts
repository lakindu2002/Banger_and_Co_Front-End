export interface ErrorResponse {
  errorCode: number;
  exceptionMessage: string; //the detailed message of the error.
  message: string; //the header message of the error
  /**
   * Error means the field name that failed the validation from the spring boot backend
   */
  multipleErrors: { error: string, message: string }[]; //error means the field name that failed the validation.
}
