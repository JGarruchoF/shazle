export async function convertToPCM(arrayBuffer: ArrayBuffer) {
  const audioContext = new window.AudioContext({
    sampleRate: 44100,
  });
  const audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
  const pcmData = audioBuffer.getChannelData(0);
  const pcmArrayBuffer = new ArrayBuffer(pcmData.length * 2);
  const pcmView = new DataView(pcmArrayBuffer);

  for (let i = 0; i < pcmData.length; i++) {
    pcmView.setInt16(i * 2, pcmData[i] * 0x7fff, true);
  }

  return pcmArrayBuffer;
}
export function arrayBufferToBase64(buffer: ArrayBuffer) {
  let binary = '';
  const bytes = new Uint8Array(buffer);
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

export async function audioChunksToBase64(audioChunks: Blob[]) {
  const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
  const arrayBuffer = await audioBlob.arrayBuffer();
  const audioBuffer = await convertToPCM(arrayBuffer);
  return arrayBufferToBase64(audioBuffer);
}
