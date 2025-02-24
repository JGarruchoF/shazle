<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { Hint, type Guess } from '@/types/guess'

import { useTrackDataStore } from '@/stores/track-data'

const trackStore = useTrackDataStore()
if (!trackStore.track) {
  router.push('/')
}

const guesses = ref<Guess[]>([])

const guessInput = ref('')
const guessed = ref(false)

function guessYear(guess: string) {
  if (!trackStore.releaseDate) return
  const guessYear = parseInt(guess.trim(), 10)

  if (isNaN(guessYear)) return

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
    <h2 class="text-center">¿De qué año es la cancion que estás escuchando?</h2>
    <div class="game">
      <input
        v-model="guessInput"
        :disabled="guessed"
        class="input"
        @keydown.enter="guessYear(guessInput)"
      />
      <div class="guesses">
        <div v-for="(guess, index) in guesses" :key="index" class="guess">
          <div>{{ guess.year }}</div>
          <div>{{ guess.hint }}</div>
        </div>
      </div>
      <div v-show="guessed" class="guessed">
        <h3>{{ trackStore.track?.title }} - {{ trackStore.track?.subtitle }}</h3>
        <img :src="trackStore.track?.images.coverart" alt="cover" class="cover" />
      </div>
    </div>
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
.input {
  height: 24px;
  margin: 20px 0;
}
.cover {
  width: 200px;
  height: 200px;
  object-fit: cover;
  margin-top: 20px;
}
.game {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.guesses {
  overflow: auto;
  max-height: 300px;
}
.guessed {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow: auto;
}
.guess {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  padding: 8px;
  font-size: 16px;
  border: rgba(15, 169, 255, 0.4) 1px solid;
}
.text-center {
  text-align: center;
}
</style>
