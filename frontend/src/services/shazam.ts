import type { ShazamData } from '@/types/shazam';
import { BaseService } from '@/services/base-service';

export default class ShazamService extends BaseService {
  baseUrl = '/shazam/';
  headers = {
    Accept: 'application/json',
  };
  async detect(payload: string, queryParams: any): Promise<ShazamData> {
    const filteredQueryParams = Object.fromEntries(
      Object.entries(queryParams).filter(([_, value]) => value !== undefined),
    );
    const queryString = new URLSearchParams({
      ...filteredQueryParams,
      timezone: 'America/Chicago',
      locale: 'en-US',
    }).toString();
    const url = `${this.baseUrl}songs/v2/detect?${queryString}`;

    const headers = { ...this.headers, 'Content-Type': 'text/plain' };
    return this.post(url, payload, headers);
  }
}
