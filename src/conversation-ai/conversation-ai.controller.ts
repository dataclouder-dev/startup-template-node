// import { Controller, Post, Body, Get, Param, Delete, Patch, Put, Res } from '@nestjs/common';
// import { ConversationAiService } from './conversation-ai.service';
// import { ConversationDTO } from './dto/create-conversation.dto';
// import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
// import { ChatMessageDict } from './clases/conversation.interface';
// import { Conversation, ConversationDocument } from './entities/conversation.entity';
// import { TTSDto } from './tts/tts.classes';
// import { TTSService } from './tts/tts-service';
// // Import FastifyReply from fastify
// import { FastifyReply } from 'fastify';

// @ApiTags('conversation-ai')
// @Controller('api/conversation-ai')
// export class ConversationAiController {
//   constructor(
//     private readonly conversationAiService: ConversationAiService,
//     private readonly ttsService: TTSService
//   ) {}

//   @Post('/conversation')
//   @ApiOperation({ summary: 'Save a new conversation' })
//   @ApiResponse({ status: 201, description: 'The conversation has been successfully created.', type: Conversation })
//   async saveConversation(@Body() conversation: Conversation): Promise<ConversationDocument> {
//     console.log('conversation', conversation);
//     return this.conversationAiService.saveConversation(conversation);
//   }

//   @Post('/chat')
//   @ApiOperation({ summary: 'Continue the conversation' })
//   @ApiResponse({ status: 200, description: 'Return the conversation.' })
//   async continueConversation(@Body() conversation: ConversationDTO): Promise<ChatMessageDict> {
//     const messages = conversation.messages as any;
//     console.log('messages', messages);
//     const response = await this.conversationAiService.chat(messages);
//     console.log('response', response);
//     return response;
//   }

//   @Post('/tts')
//   @ApiOperation({ summary: 'Generate TTS audio' })
//   @ApiResponse({ status: 200, description: 'Return the TTS audio.' })
//   async getTTS(@Body() tts: TTSDto, @Res({ passthrough: true }) res: FastifyReply): Promise<any> {
//     console.log('tts', tts);
//     const { audioContent, voiceName } = await this.ttsService.getSpeech({
//       voiceName: tts.voice,
//       text: tts.text,
//       options: {},
//       lang: null,
//       isSsml: tts.ssml,
//     });

//     res.header('Content-Type', 'audio/mpeg');
//     res.header('Content-Disposition', `attachment; filename="${voiceName}.mp3"`);
//     res.header('Content-Length', audioContent.length);
//     res.header('transcription', 'This is a transcription');

//     return audioContent;
//   }

//   @Get('/conversation')
//   @ApiOperation({ summary: 'Get all conversations' })
//   @ApiResponse({ status: 200, description: 'Return all conversations.' })
//   async getConversations(): Promise<ConversationDocument[]> {
//     console.log('getConversations');
//     return this.conversationAiService.getConversations();
//   }

//   @Get('/conversation/:id')
//   @ApiOperation({ summary: 'Get a conversation by ID' })
//   @ApiResponse({ status: 200, description: 'Return the conversation.' })
//   async getConversationById(@Param('id') id: string): Promise<ConversationDocument> {
//     return this.conversationAiService.getConversationById(id);
//   }

//   @Put('/conversation/:id')
//   @ApiOperation({ summary: 'Update a conversation by ID' })
//   @ApiResponse({ status: 200, description: 'The conversation has been successfully updated.', type: Conversation })
//   async updateConversation(@Param('id') id: string, @Body() updateData: Partial<Conversation>): Promise<ConversationDocument> {
//     return this.conversationAiService.updateConversation(id, updateData);
//   }

//   @Delete('/conversation/:id')
//   @ApiOperation({ summary: 'Delete a conversation by ID' })
//   @ApiResponse({ status: 200, description: 'Return the deleted conversation.' })
//   async deleteConversationById(@Param('id') id: string): Promise<ConversationDocument> {
//     return this.conversationAiService.deleteConversationById(id);
//   }
// }
