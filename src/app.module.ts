import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigType } from '@nestjs/config';
import envVariables from './config/environment';
import { InitModule } from './init/init.module';
import { UserModule } from './user/user.module';
import { TestModule } from './test/test.module';
import { AdminModule } from './admin/admin.module';

import { ConversationCardsModule } from '@dataclouder/conversation-card-nestjs';
import { LessonsV2Module } from '@dataclouder/lessons-nestjs';
import { MongoDBModule } from './mongo-db/database.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [envVariables], isGlobal: true }),
    MongoDBModule.forRoot(),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/static/',
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
