import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigType } from '@nestjs/config';
import envVariables from './config/environment';
import { InitModule } from './init/init.module';
import { UserModule } from './user/user.module';
// import { ConversationAiModule } from './conversation-ai/conversation-ai.module';
import { TestModule } from './test/test.module';
import { AdminModule } from './admin/admin.module';

// import { ConversationCardsModule } from '@dataclouder/conversation-card-nestjs/dist/libs/conversation-cards/src/conversation-cards.module';

import { ConversationCardsModule } from '@dataclouder/conversation-card-nestjs';
import { LessonsModule } from '@dataclouder/lessons-nestjs';
@Module({
  imports: [
    ConfigModule.forRoot({ load: [envVariables], isGlobal: true }),

    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof envVariables>) => {
        const { dbName, host, password, user } = configService.mongo;
        const str_con_qa = `mongodb+srv://${user}:${password}@${host}/${dbName}?retryWrites=true&w=majority`;
        console.log('Mongo connectiong with', host);
        return { uri: str_con_qa };
      },
      inject: [envVariables.KEY],
    }),

    InitModule,
    UserModule,
    TestModule,
    AdminModule,
    ConversationCardsModule,
    LessonsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
