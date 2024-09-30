export interface Subtitle {
  startTime: number;
  endTime: number;
  text: string;
}

export interface Audio {
  url: string;
  startTime: number;
  endTime: number;
}

export interface DubbedAudio {
  id: string;
  language: string;
  description: string;
  audios: Audio[];
  subTitles: Subtitle[];
}

export interface Audio {
  url: string;
  startTime: number;
  endTime: number;
}

export interface Video {
  id: string;
  title: string;
  description: string;
  duration: number;
  url: string;
  originalLanguage: string;
  audios: DubbedAudio[];
  currentTime?: number;
  selectedLanguage: string;
}
