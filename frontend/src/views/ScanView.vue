<script setup lang="ts">
import { ref, watch, onBeforeUnmount } from 'vue';
import router from '@/router';
import useRecord from '@/composables/use-record';
import ShazamService from '@/services/shazam';
import { audioChunksToBase64 } from '@/utils/audio-utils';
import { Button } from '@/components/ui/button';

import { useTrackDataStore } from '@/stores/track-data';

const trackStore = useTrackDataStore();

const { isRecording, startRecording, stopRecording, audioChunks } = useRecord();

const shazamService = new ShazamService();

const recordingInterval = ref<number | undefined>(undefined);

watch(audioChunks, async (value) => {
  if (value.length <= 10) {
    sendAudio(value[value.length - 1]);
  } else {
    clearInterval(recordingInterval.value);
  }
});

function onClickRecord() {
  startRecording();
  recordingInterval.value = setInterval(async () => {
    stopRecording();
    startRecording();
  }, 4000);
}

const queryParams: {
  identifier: string | undefined;
  timestamp: number | undefined;
  samplems: string | undefined;
} = {
  identifier: undefined,
  timestamp: undefined,
  samplems: undefined,
};

async function sendAudio(audioChunk: Blob) {
  const audioBase64 = await audioChunksToBase64([audioChunk]);
  const response = await shazamService.detect(audioBase64, queryParams);
  queryParams.identifier = response.tagid;
  queryParams.timestamp = response.timestamp;

  if (response.matches.length > 0) {
    trackStore.setTrack(response.track);
    clearInterval(recordingInterval.value);
    router.push('/guess');
  }
}

onBeforeUnmount(() => {
  clearInterval(recordingInterval.value);
});
</script>

<template>
  <h1 class="text-center text-3xl">Escanea una cancion para comenzar</h1>
  <Button
    class="neon-button m-auto rounded-full bg-gradient-to-br from-slate-800 to-slate-900 text-xl text-white"
    @click="onClickRecord"
  >
    {{ isRecording ? 'Escuchando...' : 'Escanear' }}
  </Button>
</template>
<style lang="css" scoped>
.neon-button {
  width: 170px;
  height: 170px;
  text-transform: uppercase;
  transition: 0.3s ease-in-out;
  box-shadow:
    0 0 10px #ff00ff,
    0 0 40px #ff00ff;
}

.neon-button:hover {
  transform: scale(1.1);
}
</style>
