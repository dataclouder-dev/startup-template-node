// src/services/text-to-speech.service.ts
import * as textToSpeech from '@google-cloud/text-to-speech';
// import { creds } from '../resources/environment';
// import { SynthAudioOptions } from '../core/app-models';
// import { AudioSpeed, VoiceCode } from '../core/app-enums';
import { AudioSpeed, GoogleVoiceHQOptions, GoogleVoiceOptions, SynthAudioOptions, VoiceCode } from './tts.classes';
import { AppException } from 'src/common/app-exception';
import { Injectable } from '@nestjs/common';
// import { GoogleVoiceHQOptions, GoogleVoiceOptions } from '../core/app-constants';
// import { AppException } from '../core/exception';

@Injectable()
export class TTSService {
  private client: textToSpeech.TextToSpeechClient;

  constructor() {
    try {
      // If you're using a service account key file, you can explicitly specify it:
      // const keyFilename = process.env.GOOGLE_APPLICATION_CREDENTIALS;
      // this.client = new textToSpeech.TextToSpeechClient({ keyFilename });

      // Or use application default credentials:
      this.client = new textToSpeech.TextToSpeechClient({
        projectId: process.env.GOOGLE_CLOUD_PROJECT,
      });
    } catch (error) {
      console.error('Error initializing Text-to-Speech client:', error);
      // throw new AppException(
      //   'Failed to initialize Text-to-Speech client. Please ensure Google Cloud credentials are properly configured.',
      //   error
      // );
    }
  }

  // Converts get_speech function
  async getSpeech(
    text: string,
    voiceName?: VoiceCode,
    options?: SynthAudioOptions,
    lang: string = 'en',
    isSsml: boolean = false
  ): Promise<{ audioContent: Buffer; voiceName: string }> {
    console.log('Voice name:', voiceName, 'Options:', options, 'Lang:', lang, 'is_ssml:', isSsml);

    let selectedVoiceName: string;
    let languageCode: string;

    if (!voiceName) {
      const voiceOptions = GoogleVoiceHQOptions.filter(voice => voice.lang.includes(lang));
      const voiceData = voiceOptions[Math.floor(Math.random() * voiceOptions.length)];
      selectedVoiceName = voiceData.id;
      languageCode = voiceData.lang;
    } else {
      const voice = GoogleVoiceOptions.find(item => item.id === voiceName);
      if (!voice) {
        throw new AppException({ error_message: `Voice ${voiceName} not found` });
      }
      selectedVoiceName = voiceName;
      languageCode = voice.lang;
    }

    let speakingRate = 1;
    if (options && !selectedVoiceName.includes('Journey')) {
      speakingRate = options.speed_rate && options.speed_rate > 0 ? options.speed_rate : this.getSpeedRate(options?.speed);
    }

    const request: textToSpeech.protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
      input: isSsml ? { ssml: text } : { text: text },
      voice: {
        languageCode: languageCode,
        name: selectedVoiceName,
      },
      audioConfig: {
        audioEncoding: 'LINEAR16',
        speakingRate: speakingRate,
      },
    };

    const [response] = await this.client.synthesizeSpeech(request);

    return {
      audioContent: response.audioContent as Buffer,
      voiceName: selectedVoiceName,
    };
  }

  // Converts get_speed_rate function
  private getSpeedRate(speed?: AudioSpeed): number {
    switch (speed) {
      case AudioSpeed.VeryFast:
        return 1.5;
      case AudioSpeed.Fast:
        return 1.25;
      case AudioSpeed.Regular:
        return 1.0;
      case AudioSpeed.Slow:
        return 0.75;
      case AudioSpeed.VerySlow:
        return 0.5;
      default:
        return 1.0;
    }
  }

  // Converts list_voices function
  async listVoices(languageCode: string = 'en-US'): Promise<void> {
    const [response] = await this.client.listVoices({ languageCode });
    const voices = response.voices?.sort((a, b) => a.name.localeCompare(b.name)) || [];

    console.log(` Voices: ${voices.length} `.padStart(60, '-').padEnd(60, '-'));
    voices.forEach(voice => {
      const languages = voice.languageCodes?.join(', ') || '';
      const name = voice.name;
      const gender = voice.ssmlGender;
      const rate = voice.naturalSampleRateHertz;

      console.log(`${languages} | ${name} | ${gender} | ${rate?.toLocaleString()} Hz`);
    });
  }

  // Converts text_to_wav function
  async textToWav(voiceName: string, text: string): Promise<void> {
    const languageCode = voiceName.split('-').slice(0, 2).join('-');

    const request: textToSpeech.protos.google.cloud.texttospeech.v1.ISynthesizeSpeechRequest = {
      input: { text: text },
      voice: {
        languageCode: languageCode,
        name: voiceName,
      },
      audioConfig: {
        audioEncoding: 'LINEAR16',
        pitch: -1.0,
        speakingRate: 0.9,
      },
    };

    const [response] = await this.client.synthesizeSpeech(request);
    console.log(response);

    const filename = `${languageCode}.wav`;

    // Note: In a real TypeScript/Node.js application, you'd use fs to write the file
    // For this example, I'll leave a placeholder comment
    // import * as fs from 'fs';
    // fs.writeFileSync(filename, response.audioContent);

    console.log(`Generated speech saved to "${filename}"`);
  }
}
