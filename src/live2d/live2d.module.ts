import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Live2dController } from './controllers/live2d.controller';
import { Live2dService } from './services/live2d.service';
import { Live2dEntity, Live2dSchema } from './schemas/live2d.schema';
import { DCMongoDBModule } from '@dataclouder/nest-mongo';
import { NestStorageModule } from '@dataclouder/nest-storage';

@Module({
  imports: [MongooseModule.forFeature([{ name: Live2dEntity.name, schema: Live2dSchema }]), DCMongoDBModule, NestStorageModule],
  controllers: [Live2dController],
  providers: [Live2dService],
  exports: [Live2dService],
})
export class Live2dModule {}
