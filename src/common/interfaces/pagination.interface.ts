export interface IPaginatedQuery {
  take: number;
  skip: number;
  page: number;
  limit: number;
}

export interface IPaginatedDBResponse<T = any> {
  results: T[];
  take: number;
  skip: number;
  total: number;
}

export interface IPaginatedResponse<T = any> {
  results: T[];
  limit: number;
  page: number;
  total: number;
}
