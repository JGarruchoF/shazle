import type { ShazamData } from '@/types/shazam'
import { BaseService } from '@/services/base-service'

export default class ShazamService extends BaseService {
  baseUrl = '/shazam/'
  headers = {
    Accept: 'application/json',
  }
  async detect(payload: string): Promise<ShazamData> {
    const url = `${this.baseUrl}songs/v2/detect`

    const headers = { ...this.headers, 'Content-Type': 'text/plain' }
    return this.post(url, payload, headers)
  }
}
