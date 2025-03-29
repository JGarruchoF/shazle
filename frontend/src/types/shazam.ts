export type TagId = string;
export type Timestamp = number;

interface Match {
  id: string;
  offset: number;
  timeskew: number;
  frequencyskew: number;
}

interface ImageLinks {
  background: string;
  coverart: string;
  coverarthq: string;
  joecolor: string;
}

interface Artist {
  id: string;
  adamid: string;
}

interface Genre {
  primary: string;
}

interface UrlParams {
  '{tracktitle}': string;
  '{trackartist}': string;
}

interface Metadata {
  title: string;
  text: string;
}

interface Section {
  type: string;
  tabname: string;
  metadata: Metadata[];
}

export interface TrackData {
  title: string;
  subtitle: string;
  images: ImageLinks;
  url: string;
  artists: Artist[];
  genres: Genre;
  urlparams: UrlParams;
  sections: Section[];
}

export interface ShazamData {
  matches: Match[];
  timestamp: Timestamp;
  timezone: string;
  tagid: TagId;
  track: TrackData;
}
