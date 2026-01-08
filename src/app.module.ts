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

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { GenericModule } from './generic/generic.module';
import { NestWhisperModule } from '@dataclouder/nest-whisper';
import { NestAiServicesSdkModule } from '@dataclouder/nest-ai-services-sdk';
import { NestUsersModule } from '@dataclouder/nest-users';
import { InitModule } from './init/init.module';
import { DeckCommanderModule } from './deck-commander/deck-commander.module';
import { DCMongoDBModule } from '@dataclouder/nest-mongo';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { NestConversationsModule } from '@dataclouder/nest-conversations';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [envVariables], isGlobal: true }),
    DCMongoDBModule.forRoot(),
    GenericModule,
    EventEmitterModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/public/',
      serveStaticOptions: {
        index: false,
      },
    }),
    UserModule,
    NestCoreModule,
    TestModule,
    AgentCardsModule,
    LessonsModule,
    NestAuthModule,
    NestWhisperModule,
    NestUsersModule,
    InitModule,
    DeckCommanderModule,
    ConversationRuleModule,
    NestConversationsModule,
    NestAiServicesSdkModule.forRoot({
      apiBaseUrl: process.env.AI_SERVICES_HOST || 'https://api.dataclouder.com',
      apiKey: process.env.AI_SERVICES_API_KEY || '',
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
