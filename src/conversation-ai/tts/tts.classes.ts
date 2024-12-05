export enum AudioSpeed {
  VerySlow = 'VerySlow',
  Slow = 'Slow',
  Regular = 'Regular',
  Fast = 'Fast',
  VeryFast = 'VeryFast',
}

export enum VoiceCode {
  MX = 'MX',
}

// export enum VoiceType {

// }

export const GoogleVoiceHQOptions: VoiceOption[] = [
  // Populate with your high-quality voice options
  { id: 'en-US-Neural2-A', lang: 'en-US' },
  // Add more voices as needed
];

export const GoogleVoiceOptions: VoiceOption[] = [
  // Populate with your standard voice options
  { id: 'en-US-Standard-C', lang: 'en-US' },
  // Add more voices as needed
];

export interface SynthAudioOptions {
  speed?: AudioSpeed;
  speed_rate?: number;
}

export interface VoiceOption {
  id: string;
  lang: string;
  name?: string;
  provider?: string;
  gender?: string;
  exampleUrl?: string;
}

export class TTSDto {
  text: string;
  ssml: string;
  voice: string;
  speed: AudioSpeed;
  speedRate: number;
  generateTranscription: boolean;
}
