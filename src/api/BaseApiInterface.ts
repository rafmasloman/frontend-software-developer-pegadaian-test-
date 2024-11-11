export interface IApiBaseResponse<T> {
  status: string;
  statusCode?: number;
  message: string;
  data: T;
}
