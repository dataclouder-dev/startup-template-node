import { DynamicModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongoService } from './mongo.service';

@Module({
  providers: [MongoService],
  exports: [MongoService],
})
export class DCMongoDBModule {
  static forRoot(): DynamicModule {
    return {
      module: DCMongoDBModule,
      imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRootAsync({
          imports: [ConfigModule],
          useFactory: (configService: ConfigService) => {
            const user = configService.get<string>('MONGO_USER');
            const pass = configService.get<string>('MONGO_PASS');
            const host = configService.get<string>('MONGO_HOST');
            const db = configService.get<string>('MONGO_DB');
            const uri = `mongodb+srv://${user}:${pass}@${host}/${db}?retryWrites=true&w=majority`;
            return {
              uri: uri,
            };
          },
          inject: [ConfigService],
        }),
      ],
    };
  }
}
