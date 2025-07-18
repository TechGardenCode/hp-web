
export type ApiState<T> = {
  data?: T;
  loading: boolean;
  error?: unknown;
  firstLoad: boolean;
};
