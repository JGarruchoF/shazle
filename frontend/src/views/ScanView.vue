<script setup lang="ts">
import useScan from '@/composables/use-scan';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-vue-next';
import { useTrackDataStore } from '@/stores/track-data';

const { setTrack } = useTrackDataStore();
// Set the track to null when the component is mounted
setTrack(null);

const { isRecording, startScan, stopScan } = useScan();
</script>

<template>
  <h1 class="text-center text-3xl">Escanea una cancion para comenzar</h1>
  <div class="m-auto flex flex-col justify-center space-y-12">
    <Button
      :class="{ recording: isRecording }"
      class="neon-button rounded-full bg-gradient-to-br from-slate-800 to-slate-900 text-xl text-white"
      @click="startScan"
    >
      {{ isRecording ? 'Escuchando...' : 'Escanear' }}
    </Button>
    <Button class="mx-auto w-9 rounded-full bg-slate-600 text-white" @click="stopScan">
      <X />
    </Button>
  </div>
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

/* Add the breath-like animation */
@keyframes breath {
  0%,
  100% {
    box-shadow:
      0 0 10px #ff00ff,
      0 0 40px #ff00ff;
  }
  50% {
    box-shadow:
      0 0 20px #ff00ff,
      0 0 80px #ff00ff;
  }
}

.neon-button.recording {
  animation: breath 1.875s infinite ease-in-out;
}
</style>
