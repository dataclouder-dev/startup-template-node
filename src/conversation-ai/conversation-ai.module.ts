import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationAiController } from './conversation-ai.controller';
import { ConversationAiService } from './conversation-ai.service';
import { Conversation, ConversationSchema } from './entities/conversation.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: Conversation.name, schema: ConversationSchema }])],
  controllers: [ConversationAiController],
  providers: [ConversationAiService],
  exports: [ConversationAiService],
})
export class ConversationAiModule { }
