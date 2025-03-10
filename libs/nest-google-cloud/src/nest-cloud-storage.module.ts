import { Module } from '@nestjs/common';
import { CloudStorageService } from './nest-cloud-storage.service';

@Module({
  providers: [CloudStorageService],
  exports: [CloudStorageService],
})
export class NestGoogleCloudModule {}
