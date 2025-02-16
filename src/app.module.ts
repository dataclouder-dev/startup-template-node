import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import envVariables from './config/environment';
import { InitModule } from './init/init.module';
import { UserModule } from './user/user.module';
import { TestModule } from './test/test.module';
import { AdminModule } from './admin/admin.module';

import { ConversationCardsModule } from '@dataclouder/conversation-card-nestjs';
import { LessonsV2Module } from '@dataclouder/lessons-nestjs';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DCMongoDBModule } from '@dataclouder/dc-mongo';
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
    InitModule,
    UserModule,
    TestModule,
    AdminModule,
    ConversationCardsModule,
    LessonsV2Module,
  ],
  controllers: [AppController],
})
export class AppModule {}
