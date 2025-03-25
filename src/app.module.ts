import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ConfigModule } from '@nestjs/config';
import envVariables from './config/environment';
import { InitModule } from './init/init.module';
import { UserModule } from './user/user.module';
import { TestModule } from './test/test.module';
import { AdminModule } from './admin/admin.module';

import { AgentCardsModule } from '@dataclouder/nest-agent-cards';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DCMongoDBModule } from 'libs/nest-mongo/src';
import { GenericModule } from './generic/generic.module';
import { NotionModule } from '@dataclouder/notion';

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
    AgentCardsModule,
    NotionModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
