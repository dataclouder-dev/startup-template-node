import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AgentCardsModule, ConversationRuleModule } from '@dataclouder/nest-agent-cards';
import { NestAuthModule } from '@dataclouder/nest-auth';
import { NestAnalyticsModule } from '@dataclouder/nest-analytics';
import { NestPaymentsModule } from '@dataclouder/nest-payments';
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
import { templatePaymentsOptions } from './payments/payments.config';

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
    NestAuthModule.forRoot({
      firebase: false,
      localJwt: {
        secret: process.env.JWT_SECRET,
        appName: process.env.APP_NAME || 'Startup Template',
        fromEmail: process.env.AUTH_FROM_EMAIL,
        resendApiKey: process.env.RESEND_API_KEY,
        googleClientIds: (process.env.GOOGLE_CLIENT_ID || '')
          .split(',')
          .map(s => s.trim())
          .filter(Boolean),
        cookieSameSite: (process.env.COOKIE_SAME_SITE as 'Lax' | 'Strict' | 'None') || 'Lax',
        cookieSecure: process.env.COOKIE_SECURE ? process.env.COOKIE_SECURE === 'true' : process.env.NODE_ENV === 'production',
        cookieDomain: process.env.COOKIE_DOMAIN || undefined,
      },
    }),
    NestUsersModule,
    NestAnalyticsModule.forRoot({
      appId: process.env.APP_ID || 'startup-template',
    }),
    NestPaymentsModule.forRoot(templatePaymentsOptions),
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
