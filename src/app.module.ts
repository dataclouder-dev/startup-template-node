import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AgentCardsModule } from '@dataclouder/nest-agent-cards';
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
import { DCMongoDBModule } from 'libs/nest-mongo/src';
import { GenericModule } from './generic/generic.module';
import { NestWhisperModule } from '@dataclouder/nest-whisper';
import { NestVertexModule } from '@dataclouder/nest-vertex';
import { NestUsersModule } from '@dataclouder/nest-users';
import { InitModule } from './init/init.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [envVariables], isGlobal: true }),
    DCMongoDBModule.forRoot(),
    GenericModule,
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
    NestVertexModule,
    NestAuthModule,
    NestWhisperModule,
    NestUsersModule,
    InitModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
