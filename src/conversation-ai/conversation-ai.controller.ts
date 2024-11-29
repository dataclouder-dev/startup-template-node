import { Controller, Post, Body } from '@nestjs/common';
import { ConversationAiService } from './conversation-ai.service';
import { ConversationDTO } from './dto/create-conversation.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('conversation-ai')
@Controller('api/conversation-ai')
export class ConversationAiController {
  constructor(private readonly conversationAiService: ConversationAiService) { }


  @Post('/chat')
  @ApiOperation({ summary: 'Continue the conversation' })
  @ApiResponse({ status: 200, description: 'Return the conversation.' })
  async continueConversation(@Body() conversation: ConversationDTO) {
    const messages = conversation.messages as any;
    console.log('messages', messages);
    const response = await this.conversationAiService.chat(messages);
    console.log('response', response);
    return response;
  }
}
