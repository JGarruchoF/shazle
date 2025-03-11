<script setup lang="ts">
import { ref } from 'vue'
import router from '@/router'
import { Hint, type Guess } from '@/types/guess'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-vue-next'
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
  <h1 class="mb-8 text-center text-3xl">¿De qué año es la cancion que estás escuchando?</h1>
  <div class="mb-2 flex w-full items-center">
    <Input
      v-model="guessInput"
      :disabled="guessed"
      class="h-10 flex-grow rounded border border-primary p-2"
      @keydown.enter="guessYear(guessInput)"
    />
    <Button @click="guessYear(guessInput)" :disabled="guessed" size="icon" class="ml-2 bg-primary">
      <ChevronRight />
    </Button>
  </div>
  <div class="min-h-[120px] w-full overflow-y-auto">
    <div
      v-for="(guess, index) in guesses"
      :key="index"
      class="mb-2 flex h-10 justify-between rounded border border-secondary p-2"
    >
      <div>{{ guess.year }}</div>
      <div>{{ guess.hint }}</div>
    </div>
  </div>
  <div v-show="guessed" class="mt-5 flex flex-col items-center">
    <h3 class="text-xl font-semibold">
      {{ trackStore.track?.title }} - {{ trackStore.track?.subtitle }}
    </h3>
    <img :src="trackStore.track?.images.coverart" alt="cover" class="mt-4 h-52 w-52 object-cover" />
  </div>
</template>
