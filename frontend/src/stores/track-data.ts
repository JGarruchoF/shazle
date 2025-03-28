import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import type { TrackData } from '@/types/shazam';

export const useTrackDataStore = defineStore('trackData', () => {
  const currentTrackData = ref<null | TrackData>(null);

  function setTrack(newTrackData: TrackData) {
    currentTrackData.value = newTrackData;
  }

  return { currentTrackData, setTrack };
});
