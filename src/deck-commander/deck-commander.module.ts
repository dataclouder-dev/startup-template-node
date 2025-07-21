import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { DeckCommanderController } from './controllers/deck-commander.controller';
import { DeckCommanderService } from './services/deck-commander.service';
import { DeckCommanderEntity, DeckCommanderSchema } from './schemas/deck-commander.schema';
import { DCMongoDBModule } from '@dataclouder/nest-mongo';
import { NestGoogleCloudModule } from '@dataclouder/nest-google-cloud';

@Module({
  imports: [MongooseModule.forFeature([{ name: DeckCommanderEntity.name, schema: DeckCommanderSchema }]), DCMongoDBModule, NestGoogleCloudModule],
  controllers: [DeckCommanderController],
  providers: [DeckCommanderService],
  exports: [DeckCommanderService],
})
export class DeckCommanderModule {}
