import { ClientAdapter } from '@infra/adapter/http/client/client'

export class InMemoryClientAdapter implements ClientAdapter {
  constructor() {}

  async get<T>(url: string, config: any): Promise<T> {
    return {
      url,
      config,
    } as T
  }

  async post<R, T>(url: string, body: R, config: any): Promise<T> {
    return {
      url,
      body,
      config,
    } as T
  }
}
