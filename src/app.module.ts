import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AgentCardsModule } from '@dataclouder/nest-agent-cards';
import { NestAuthModule } from '@dataclouder/nest-auth';
// import { NotionModule } from '@dataclouder/notion';
import { LessonsModule } from '@dataclouder/nest-lessons';
import { NestCoreModule } from '@dataclouder/nest-core';

import { AppController } from './app.controller';
import envVariables from './config/environment';
import { InitModule } from './init/init.module';
import { UserModule } from './user/user.module';
import { TestModule } from './test/test.module';
import { AdminModule } from './admin/admin.module';

import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DCMongoDBModule } from 'libs/nest-mongo/src';
import { GenericModule } from './generic/generic.module';

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
    // InitModule,
    // UserModule,
    NestCoreModule,
    TestModule,
    // AdminModule,
    // NestAuthModule,
    // AgentCardsModule,
    // NotionModule,
    LessonsModule,
    // NestAuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
