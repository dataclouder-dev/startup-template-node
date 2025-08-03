import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GenericController } from './controllers/generic.controller';
import { GenericService } from './services/generic.service';
import { GenericEntity, GenericSchema } from './schemas/generic.schema';
import { DCMongoDBModule } from '@dataclouder/nest-mongo';
import { NestStorageModule } from '@dataclouder/nest-storage';

@Module({
  imports: [MongooseModule.forFeature([{ name: GenericEntity.name, schema: GenericSchema }]), DCMongoDBModule, NestStorageModule],
  controllers: [GenericController],
  providers: [GenericService],
  exports: [GenericService],
})
export class GenericModule {}
