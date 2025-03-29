import { ref } from 'vue';
import { Hint, type Guess } from '@/types/guess';
import type { TrackData } from '@/types/shazam';

export default function useGuess(trackData: TrackData | null) {
  const guesses = ref<Guess[]>([]);
  const currentGuess = ref('');
  const isGuessed = ref(false);

  function getTrackReleaseYear(trackData: TrackData | null): number | null {
    const SONG_SECTION_NAME = 'SONG';
    const RELEASE_DATE_METADATA_NAME = 'Released';

    const yearString = trackData?.sections
      .find((section) => section.type === SONG_SECTION_NAME)
      ?.metadata.find((metadata) => metadata.title === RELEASE_DATE_METADATA_NAME)?.text;

    if (!yearString) {
      throw new Error('Year not found in track data');
    }

    return parseInt(yearString, 10);
  }

  const trackReleaseYear = getTrackReleaseYear(trackData);

  function submitGuess(guess: string) {
    if (trackReleaseYear === null) {
      throw new Error('Track release year is not available');
    }

    const guessYear = parseInt(guess.trim(), 10);
    if (isNaN(guessYear)) return;

    let hint: Hint;
    if (guessYear < trackReleaseYear) {
      hint = Hint.LOW;
    } else if (guessYear > trackReleaseYear) {
      hint = Hint.HIGH;
    } else {
      hint = Hint.CORRECT;
    }

    guesses.value.unshift({ year: guessYear, hint });
    currentGuess.value = '';
    if (hint === Hint.CORRECT) {
      isGuessed.value = true;
    }
  }

  return {
    guesses,
    currentGuess,
    isGuessed,
    submitGuess,
  };
}
