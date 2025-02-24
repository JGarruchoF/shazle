import { ref } from 'vue'
export default function useRecord() {
  const audioChunks = ref<Blob[]>([])
  const isRecording = ref(false)
  const mediaRecorder = ref<MediaRecorder | null>(null)

  const chunks: Blob[] = []

  async function startRecording() {
    if (isRecording.value) {
      return
    }
    const stream = await navigator.mediaDevices.getUserMedia({
      audio: true,
    })
    mediaRecorder.value = new MediaRecorder(stream, {
      mimeType: 'audio/webm;codecs=pcm',
      audioBitsPerSecond: 44100,
    })
    mediaRecorder.value.ondataavailable = (event) => {
      chunks.push(event.data)
    }
    mediaRecorder.value.start()
    mediaRecorder.value.onstop = onStop
    isRecording.value = true
  }

  function onStop(event: Event) {
    isRecording.value = false
    audioChunks.value = [...chunks]
  }
  function stopRecording() {
    mediaRecorder.value?.stop()
  }

  return {
    isRecording,
    startRecording,
    stopRecording,
    audioChunks,
  }
}
