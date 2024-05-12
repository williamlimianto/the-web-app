export type FetchResponse<T> = {
  ok: boolean;
  status: number;
  message: string;
  data: T;
}