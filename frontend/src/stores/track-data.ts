import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import type { Track } from '@/types/shazam'

export const useTrackDataStore = defineStore('trackData', () => {
  const track = ref<null | Track>(null)
  const count = ref(0)

  const releaseDate = computed<null | number>(() => {
    const yearString = track.value?.sections
      .find((section) => section.type === 'SONG')
      ?.metadata.find((metadata) => metadata.title === 'Released')?.text

    if (yearString) {
      return parseInt(yearString, 10)
    } else {
      return null
    }
  })

  function setTrack(newTrack: Track) {
    track.value = newTrack
    count.value++
  }

  return { track, releaseDate, setTrack, count }
})
