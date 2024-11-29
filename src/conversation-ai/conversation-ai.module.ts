import { Module } from '@nestjs/common';
import { ConversationAiController } from './conversation-ai.controller';
import { ConversationAiService } from './conversation-ai.service';

@Module({
  controllers: [ConversationAiController],
  providers: [ConversationAiService],
  exports: [ConversationAiService],
})
export class ConversationAiModule {}
