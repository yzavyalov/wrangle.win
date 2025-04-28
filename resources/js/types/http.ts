export interface HTTPResponse<T = any> {
  data: T,
  message: string,
  status: number,
  success: boolean
}
