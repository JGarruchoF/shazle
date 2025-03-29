<script setup lang="ts">
import { watchEffect } from 'vue';
import router from '@/router';
import { Hint } from '@/types/guess';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ChevronRight, ChevronLeft, MoveUp, MoveDown, Crown } from 'lucide-vue-next';
import useGuess from '@/composables/use-guess';
import { useTrackDataStore } from '@/stores/track-data';

const { currentTrackData } = useTrackDataStore();

// Redirect to the home page if no track is available
watchEffect(() => {
  if (!currentTrackData) {
    router.push('/');
  }
});

const { guesses, currentGuess, isGuessed, submitGuess } = useGuess(currentTrackData);
</script>

<template>
  <div class="flex">
    <Button @click="() => router.push('/')" size="icon" class="absolute left-4 top-4 bg-secondary">
      <ChevronLeft />
    </Button>
  </div>
  <h1 class="mb-8 text-center text-3xl">¿De qué año es la canción que estás escuchando?</h1>
  <div class="mb-2 flex w-full items-center">
    <Input
      v-model="currentGuess"
      :disabled="isGuessed"
      class="h-10 flex-grow rounded border border-primary p-2"
      @keydown.enter="submitGuess(currentGuess)"
    />
    <Button
      @click="submitGuess(currentGuess)"
      :disabled="isGuessed"
      size="icon"
      class="ml-2 bg-primary"
    >
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
      <div>
        <MoveUp v-if="guess.hint === Hint.LOW" class="text-secondary" />
        <MoveDown v-else-if="guess.hint === Hint.HIGH" class="text-primary" />
        <Crown v-else class="text-accent" />
      </div>
    </div>
  </div>
  <div v-show="isGuessed" class="mt-5 flex flex-col items-center">
    <h3 class="text-xl font-semibold">
      {{ currentTrackData?.title }} - {{ currentTrackData?.subtitle }}
    </h3>
    <img
      :src="currentTrackData?.images?.coverart"
      alt="cover"
      class="mt-4 h-52 w-52 object-cover"
    />
  </div>
</template>
