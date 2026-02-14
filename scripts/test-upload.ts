import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { IStorageService } from '@dataclouder/nest-storage';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';

async function testUpload() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    { logger: false }
  );

  try {
    const storageService = app.get<IStorageService>('IStorageService');
    const content = `Test upload at ${new Date().toISOString()}`;
    const buffer = Buffer.from(content);
    const fileName = `test-folder/test-${Date.now()}.txt`;

    console.log(`Uploading ${fileName}...`);
    const result = await storageService.uploadFile(
      fileName,
      buffer,
      { createdBy: 'system', updatedBy: 'system' },
      'text/plain'
    );

    console.log('Upload successful!');
    console.log('Result:', JSON.stringify(result, null, 2));
  } catch (error) {
    console.error('Upload failed:', error);
  } finally {
    await app.close();
  }
}

testUpload();
