import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigType } from '@nestjs/config';
import envVariables from './config/environment';
import { InitModule } from './init/init.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [envVariables], isGlobal: true }),

    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigType<typeof envVariables>) => {
        const { dbName, host, password, user } = configService.mongo;
        const str_con_qa = `mongodb+srv://${user}:${password}@${host}/${dbName}?retryWrites=true&w=majority`;
        console.log('Mongo connectiong with', host);
        return { uri: str_con_qa, user: '', pass: '', dbName: '' };
      },
      inject: [envVariables.KEY],
    }),

    InitModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
