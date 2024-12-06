import { Controller, Post, Body, Get, Param, Delete, Patch, Put } from '@nestjs/common';
import { ConversationAiService } from './conversation-ai.service';
import { ConversationDTO } from './dto/create-conversation.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChatMessageDict } from './clases/conversation.interface';
import { Conversation, ConversationDocument } from './entities/conversation.entity';
import { TTSDto } from './tts/tts.classes';
import { TTSService } from './tts/tts-service';

@ApiTags('conversation-ai')
@Controller('api/conversation-ai')
export class ConversationAiController {
  constructor(
    private readonly conversationAiService: ConversationAiService,
    private readonly ttsService: TTSService
  ) {}

  @Post('/conversation')
  @ApiOperation({ summary: 'Save a new conversation' })
  @ApiResponse({ status: 201, description: 'The conversation has been successfully created.', type: Conversation })
  async saveConversation(@Body() conversation: Conversation): Promise<ConversationDocument> {
    console.log('conversation', conversation);
    return this.conversationAiService.saveConversation(conversation);
  }

  @Post('/chat')
  @ApiOperation({ summary: 'Continue the conversation' })
  @ApiResponse({ status: 200, description: 'Return the conversation.' })
  async continueConversation(@Body() conversation: ConversationDTO): Promise<ChatMessageDict> {
    const messages = conversation.messages as any;
    console.log('messages', messages);
    const response = await this.conversationAiService.chat(messages);
    console.log('response', response);
    return response;
  }

  @Post('/tts')
  @ApiOperation({ summary: 'Continue the conversation' })
  @ApiResponse({ status: 200, description: 'Return the conversation.' })
  async getTTS(@Body() tts: TTSDto): Promise<ChatMessageDict> {
    console.log('tts', tts);
    this.ttsService.getSpeech('hola');
    return tts as any;
  }

  @Get('/conversation')
  @ApiOperation({ summary: 'Get all conversations' })
  @ApiResponse({ status: 200, description: 'Return all conversations.' })
  async getConversations(): Promise<ConversationDocument[]> {
    console.log('getConversations');
    return this.conversationAiService.getConversations();
  }

  @Get('/conversation/:id')
  @ApiOperation({ summary: 'Get a conversation by ID' })
  @ApiResponse({ status: 200, description: 'Return the conversation.' })
  async getConversationById(@Param('id') id: string): Promise<ConversationDocument> {
    return this.conversationAiService.getConversationById(id);
  }

  @Put('/conversation/:id')
  @ApiOperation({ summary: 'Update a conversation by ID' })
  @ApiResponse({ status: 200, description: 'The conversation has been successfully updated.', type: Conversation })
  async updateConversation(@Param('id') id: string, @Body() updateData: Partial<Conversation>): Promise<ConversationDocument> {
    return this.conversationAiService.updateConversation(id, updateData);
  }

  @Delete('/conversation/:id')
  @ApiOperation({ summary: 'Delete a conversation by ID' })
  @ApiResponse({ status: 200, description: 'Return the deleted conversation.' })
  async deleteConversationById(@Param('id') id: string): Promise<ConversationDocument> {
    return this.conversationAiService.deleteConversationById(id);
  }
}
