export interface ClientAdapter {
  get<Result>(url: string, config?: any): Promise<Result>
  post<Body = {} extends unknown ? {} : never, Result = unknown>(
    url: string,
    body: Body,
    config?: any,
  ): Promise<Result>
}
