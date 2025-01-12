import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AudioTranscriptionService {
  private openai: OpenAI;

  constructor(private configService: ConfigService) {
    this.openai = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI_API_KEY'),
    });
  }

  async transcribeAudio(audioBuffer: Buffer): Promise<any> {
    try {
      const file = new File([audioBuffer], 'audio.mp3', { type: 'audio/mpeg' });

      const transcription = await this.openai.audio.transcriptions.create({
        model: 'whisper-1',
        file: file,
        response_format: 'verbose_json',
        timestamp_granularities: ['word'],
      });

      return transcription;
    } catch (error) {
      console.error('Error transcribing audio:', error);
      throw error;
    }
  }
}
