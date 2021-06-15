export interface ErrorResponse {
  errorCode: number;
  exceptionMessage: string;
  message: string;
  /**
   * Error means the field name that failed the validation from the spring boot backend
   */
  multipleErrors: { error: string, message: string }[]; //error means the field name that failed the validation.
}
