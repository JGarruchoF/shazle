interface Match {
  id: string
  offset: number
  timeskew: number
  frequencyskew: number
}

interface ImageLinks {
  background: string
  coverart: string
  coverarthq: string
  joecolor: string
}

interface ShareLinks {
  subject: string
  text: string
  href: string
  image: string
  twitter: string
  html: string
  avatar: string
  snapchat: string
}

interface Action {
  name: string
  type: string
  id?: string
  uri?: string
}

interface Option {
  caption: string
  actions: Action[]
  beacondata: {
    type: string
    providername: string
  }
  image: string
  type: string
  listcaption: string
  overflowimage: string
  colouroverflowimage: boolean
  providername: string
}

interface Provider {
  caption: string
  images: {
    overflow: string
    default: string
  }
  actions: Action[]
  type: string
}

interface Hub {
  type: string
  image: string
  actions: Action[]
  options: Option[]
  providers: Provider[]
  explicit: boolean
  displayname: string
}

interface Artist {
  id: string
  adamid: string
}

interface Genre {
  primary: string
}

interface UrlParams {
  '{tracktitle}': string
  '{trackartist}': string
}

interface MyShazam {
  apple: {
    actions: Action[]
  }
}

interface MetaPage {
  image: string
  caption: string
}

interface Metadata {
  title: string
  text: string
}

interface Section {
  type: string
  metapages: MetaPage[]
  tabname: string
  metadata: Metadata[]
}

export interface Track {
  layout: string
  type: string
  key: string
  title: string
  subtitle: string
  images: ImageLinks
  share: ShareLinks
  hub: Hub
  url: string
  artists: Artist[]
  isrc: string
  genres: Genre
  urlparams: UrlParams
  myshazam: MyShazam
  albumadamid: string
  sections: Section[]
}

export interface ShazamData {
  matches: Match[]
  timestamp: number
  timezone: string
  tagid: string
  track: Track
}
