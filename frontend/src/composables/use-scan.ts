import { ref, watch } from 'vue';
import useRecord from '@/composables/use-record';
import useShazamService from '@/services/shazam';
import type { QueryParams } from '@/services/shazam';
import { audioChunksToBase64 } from '@/utils/audio-utils';
import { useTrackDataStore } from '@/stores/track-data';
import router from '@/router';

export default function useScan() {
  const trackStore = useTrackDataStore();
  const { isRecording, startRecording, stopRecording, audioChunks } = useRecord({
    chunkDuration: 4000,
  });
  const recordingInterval = ref<number | undefined>(undefined);

  const queryParams = ref<QueryParams>({
    identifier: undefined,
    timestamp: undefined,
  });

  const { detect } = useShazamService();

  async function sendAudio(audioChunks: Blob) {
    try {
      const audioBase64 = await audioChunksToBase64([audioChunks]);
      const response = await detect(audioBase64, queryParams.value);
      queryParams.value.identifier = response.tagid;
      queryParams.value.timestamp = response.timestamp; // TODO: implement timestamp and samplems

      if (response.matches.length > 0) {
        trackStore.setTrack(response.track);
        clearInterval(recordingInterval.value);
        router.push('/guess');
      }
    } catch (error) {
      console.error('Something went wrong while sending audio:', error);
      // TODO: Handle error appropriately, e.g., show a notification to the user
    }
  }

  watch(
    audioChunks,
    async (value) => {
      if (value.length <= 10) {
        sendAudio(value[value.length - 1]);
      }
    },
    { deep: true },
  );

  return {
    isRecording,
    startScan: startRecording,
    stopScan: stopRecording,
  };
}
