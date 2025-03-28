import type { ShazamData, Timestamp, TagId } from '@/types/shazam';
import type { Base64String } from '@/types/common';
import { api } from '@/services/api';

export interface QueryParams {
  identifier?: TagId;
  timestamp?: Timestamp;
}

export default function useShazamService() {
  const baseUrl = '/shazam/';
  async function detect(payload: Base64String, queryParams: QueryParams): Promise<ShazamData> {
    const { identifier, timestamp } = queryParams;

    const url = new URL(`${baseUrl}songs/v2/detect`, window.location.origin);
    url.searchParams.append('timezone', 'America/Chicago');
    url.searchParams.append('locale', 'en-US');

    if (identifier) {
      url.searchParams.append('identifier', identifier);
    }
    if (timestamp) {
      url.searchParams.append('timestamp', timestamp.toString());
    }

    return api.post<ShazamData>(url, payload, { 'Content-Type': 'text/plain' });
  }
  return {
    detect,
  };
}
