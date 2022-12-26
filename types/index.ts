export interface BaseResponse<T> {
  data: T;
  success: boolean;
  msg?: string;
}
