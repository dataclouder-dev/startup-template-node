import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import Groq from 'groq-sdk';
import { ChatCompletionMessageParam } from 'groq-sdk/resources/chat/completions';
import { ChatMessageDict, ChatRole, IConversationCard } from './clases/conversation.interface';
import { Conversation, ConversationDocument } from './entities/conversation.entity';
import { ObjectId } from 'mongodb';

@Injectable()
export class ConversationAiService {
  private readonly groqClient: Groq;

  constructor(@InjectModel(Conversation.name) private conversationModel: Model<ConversationDocument>) {
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

  async saveConversation(conversation: IConversationCard): Promise<ConversationDocument> {
    if (!conversation['_id']) {
      delete conversation['_id'];
    }

    const newConversation = new this.conversationModel(conversation);
    return newConversation.save();
  }

  async updateConversation(id: string, updateData: Partial<Conversation>): Promise<ConversationDocument> {
    const _id = new ObjectId(id);
    return this.conversationModel.findByIdAndUpdate(_id, updateData, { new: true }).exec();
  }

  async getConversations(): Promise<ConversationDocument[]> {
    return this.conversationModel.find().exec();
  }

  async getConversationById(id: string): Promise<ConversationDocument> {
    const _id = new ObjectId(id);
    return this.conversationModel.findById(_id).exec();
  }

  async deleteConversationById(id: string): Promise<ConversationDocument> {
    const _id = new ObjectId(id);
    return this.conversationModel.findByIdAndDelete(_id).exec();
  }
}
