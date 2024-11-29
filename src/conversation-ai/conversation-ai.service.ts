import { Injectable } from '@nestjs/common';

import Groq from 'groq-sdk';
import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions';
import { ChatMessageDict, ChatRole } from './interfaces/conversation.interface';

@Injectable()
export class ConversationAiService {
  private readonly groqClient: Groq;

  constructor() {
    this.groqClient = new Groq({
      apiKey: process.env['GROQ_API_KEY'],
    });
  }


  async generateCompletion(prompt: string): Promise<string> {
    try {
      const completion = await this.groqClient.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'mixtral-8x7b-32768',
        temperature: 0.7,
        max_tokens: 1024,
      });

      return completion.choices[0]?.message?.content || '';
    } catch (error) {
      throw new Error(`Failed to generate completion: ${error.message}`);
    }
  }

  async chat(messages: ChatCompletionMessageParam[]): Promise<ChatMessageDict> {
    try {
      const completion = await this.groqClient.chat.completions.create({
        messages,
        model: 'mixtral-8x7b-32768',
        temperature: 0.7,
        max_tokens: 1024,
      });
      return {
        content: completion.choices[0]?.message?.content || '',
        role: ChatRole.Assistant,
        metadata: null,
      };
    } catch (error) {
      throw new Error(`Failed to generate completion: ${error.message}`);
    }
  }

  async getCompletion(prompt: string): Promise<string> {
    try {
      const completion = await this.groqClient.chat.completions.create({
        messages: [{ role: 'user', content: prompt }],
        model: 'mixtral-8x7b-32768',
        temperature: 0.7,
        max_tokens: 1024,
      });

      return completion.choices[0]?.message?.content || '';
    } catch (error) {
      throw new Error(`Failed to generate completion: ${error.message}`);
    }
  }
}
