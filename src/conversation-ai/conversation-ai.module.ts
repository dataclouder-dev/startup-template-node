import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationAiController } from './conversation-ai.controller';
import { ConversationAiService } from './conversation-ai.service';
import { Conversation, ConversationSchema } from './entities/conversation.entity';
import { TTSService } from './tts/tts-service';

@Module({
  imports: [MongooseModule.forFeature([{ name: Conversation.name, schema: ConversationSchema }])],
  controllers: [ConversationAiController],
  providers: [ConversationAiService, TTSService],
  exports: [ConversationAiService],
})
export class ConversationAiModule {}
