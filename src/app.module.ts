import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AgentCardsModule, ConversationRuleModule } from '@dataclouder/nest-agent-cards';
import { NestAuthModule } from '@dataclouder/nest-auth';
// import { NotionModule } from '@dataclouder/notion';
import { LessonsModule } from '@dataclouder/nest-lessons';
import { NestCoreModule } from '@dataclouder/nest-core';

import { AppController } from './app.controller';
import envVariables from './config/environment';
import { UserModule } from './user/user.module';
import { TestModule } from './test/test.module';

import { GenericModule } from './generic/generic.module';
import { NestAiServicesSdkModule } from '@dataclouder/nest-ai-services-sdk';
import { NestUsersModule } from '@dataclouder/nest-users';
import { InitModule } from './init/init.module';
import { DeckCommanderModule } from './deck-commander/deck-commander.module';
import { DCMongoDBModule } from '@dataclouder/nest-mongo';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NestConversationsModule } from '@dataclouder/nest-conversations';
import { NestStorageModule } from '@dataclouder/nest-storage';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [envVariables], isGlobal: true }),
    DCMongoDBModule.forRoot(),
    GenericModule,
    EventEmitterModule.forRoot(),
    UserModule,
    NestCoreModule,
    TestModule,
    AgentCardsModule,
    LessonsModule,
    NestAuthModule,
    NestUsersModule,
    InitModule,
    DeckCommanderModule,
    ConversationRuleModule,
    NestConversationsModule,
    NestStorageModule,
    NestAiServicesSdkModule.forRoot({
      apiBaseUrl: process.env.AI_SERVICES_HOST || 'https://api.dataclouder.com',
      apiKey: process.env.AI_SERVICES_API_KEY || '',
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
