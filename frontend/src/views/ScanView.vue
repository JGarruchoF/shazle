<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import router from '@/router'
import useRecord from '@/composables/use-record'
import ShazamService from '@/services/shazam'
import { audioChunksToBase64 } from '@/utils/audio-utils'

import { useTrackDataStore } from '@/stores/track-data'

const trackStore = useTrackDataStore()

const { isRecording, startRecording, stopRecording, audioChunks } = useRecord()

const shazamService = new ShazamService()

watch(isRecording, async (value) => {
  await nextTick()
  if (!value) {
    sendAudio(audioChunks.value)
  }
})

const loadingDetect = ref(false)

async function sendAudio(audioChunks: Blob[]) {
  loadingDetect.value = true
  try {
    const audioBase64 = await audioChunksToBase64(audioChunks)
    const response = await shazamService.detect(audioBase64)
    if (response.matches.length > 0) {
      trackStore.setTrack(response.track)
      router.push('/guess')
    }
  } finally {
    loadingDetect.value = false
  }
}
</script>

<template>
  <div class="container">
    <div>
      <h1 class="text-center">Escanea una cancion para comenzar</h1>
    </div>
    <button v-if="loadingDetect" class="scan-button">Cargando...</button>
    <button
      v-else
      class="scan-button"
      @click="() => (isRecording ? stopRecording() : startRecording())"
    >
      {{ isRecording ? 'Escuchando...' : 'Escanear' }}
    </button>
  </div>
</template>
<style lang="css" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow: auto;
}
.scan-button {
  margin: auto;
  width: 150px;
  height: 150px;
  background: linear-gradient(145deg, #0c1c2d, #0d0d0d); /* Darker gradient */
  border: none;
  border-radius: 50%;
  box-shadow:
    0 0 30px rgba(255, 255, 255, 0.1),
    0 0 20px rgba(15, 169, 255, 0.4); /* All-around shadow */
  cursor: pointer;
  position: relative;
  overflow: hidden;
  outline: none;
  color: white;
  font-size: 1rem;
  transition:
    transform 0.2s ease,
    box-shadow 0.3s ease;
}
.text-center {
  text-align: center;
}
</style>
