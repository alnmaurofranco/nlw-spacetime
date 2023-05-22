import axios from 'axios'
import { ClientAdapter } from './client'

export class AxiosClientAdapter implements ClientAdapter {
  constructor(options: any) {}

  async get<T>(url: string, config?: any): Promise<T> {
    const response = await axios.get(url, config)
    return response.data
  }

  async post<T, R>(url: string, body: T, config?: any): Promise<R> {
    const response = await axios.post(url, body, config)
    return response.data
  }
}
