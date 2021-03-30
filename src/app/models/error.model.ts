export interface ErrorHandlerAPI {
  message: string,
  exceptionMessage: string,
  errorCode: number,
  multipleErrors?: { error: string, message: string }[]
}
