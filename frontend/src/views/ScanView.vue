<script setup lang="ts">
import { ref, watch, nextTick } from 'vue'
import useRecord from '@/composables/use-record'
import ShazamService from '@/services/shazam'
import { audioChunksToBase64 } from '@/utils/audio-utils'
import { Hint, type Guess } from '@/types/guess'

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
    }
  } finally {
    loadingDetect.value = false
  }
}

const guesses = ref<Guess[]>([])

const guessInput = ref('')
const guessed = ref(false)

function guessYear(guess: string) {
  if (!trackStore.releaseDate) return
  const guessYear = parseInt(guess.trim(), 10)

  let hint: Hint
  if (guessYear < trackStore.releaseDate) {
    hint = Hint.LOW
  } else if (guessYear > trackStore.releaseDate) {
    hint = Hint.HIGH
  } else {
    hint = Hint.CORRECT
  }

  guesses.value.push({ year: guessYear, hint })
  guessInput.value = ''
  if (hint === Hint.CORRECT) {
    guessed.value = true
  }
}
</script>

<template>
  <div class="container">
    <template v-if="!loadingDetect && !trackStore.releaseDate">
      <h1>Escanea una cancion para comenzar</h1>
      <button v-if="isRecording" @click="stopRecording">Parar de escanear</button>
      <button v-else @click="startRecording">Escanear</button>
    </template>
    <div v-else-if="loadingDetect">Cargando...</div>
    <template v-else>
      <h1>¡Listo!</h1>
      <h2>¿De qué año es la cancion que estás escuchando?</h2>
      <input v-model="guessInput" :disabled="guessed" @keydown.enter="guessYear(guessInput)" />
    </template>
    <div v-for="(guess, index) in guesses" :key="index">{{ guess.year }}: {{ guess.hint }}</div>
    <div v-show="guessed" class="guessed">
      <h3>{{ trackStore.track?.title }} - {{ trackStore.track?.subtitle }}</h3>
      <img :src="trackStore.track?.images.coverart" alt="cover" class="cover" />
    </div>
  </div>
</template>
<style lang="css" scoped>
.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
}
.cover {
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-top: 20px;
}
.guessed {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
