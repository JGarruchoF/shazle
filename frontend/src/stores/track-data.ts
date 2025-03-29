import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { TrackData } from '@/types/shazam';

export const useTrackDataStore = defineStore('trackData', () => {
  const currentTrackData = ref<null | TrackData>();

  function setTrack(newTrackData: TrackData | null) {
    currentTrackData.value = newTrackData;
  }

  return { currentTrackData, setTrack };
});
