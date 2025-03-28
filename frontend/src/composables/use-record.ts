import { ref, onBeforeUnmount } from 'vue';

export interface UseRecordConfig {
  chunkDuration?: number;
  mimeType?: string;
  audioBitsPerSecond?: number;
}

export default function useRecord(options?: UseRecordConfig) {
  const {
    chunkDuration = 3000,
    mimeType = 'audio/webm',
    audioBitsPerSecond = 44100,
  } = options || {};

  const audioChunks = ref<Blob[]>([]);
  const isRecording = ref(false);
  const mediaRecorder = ref<MediaRecorder | null>(null);

  async function startRecording() {
    if (isRecording.value) {
      return;
    }

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

    mediaRecorder.value = new MediaRecorder(stream, {
      mimeType,
      audioBitsPerSecond,
    });

    mediaRecorder.value.ondataavailable = (event) => {
      if (event.data.size > 0) {
        audioChunks.value.push(event.data);
      }
    };

    mediaRecorder.value.start();
    isRecording.value = true;
  }

  function stopRecording() {
    mediaRecorder.value?.stop();
    isRecording.value = false;
  }

  setInterval(() => {
    mediaRecorder.value?.stop();
    mediaRecorder.value?.start();
  }, chunkDuration);

  onBeforeUnmount(() => {
    stopRecording();
  });

  return {
    isRecording,
    startRecording,
    stopRecording,
    audioChunks,
  };
}
