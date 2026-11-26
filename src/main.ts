import './common/node-slowbuffer.shim';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AllExceptionsHandler } from '@dataclouder/nest-core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConsoleLogger } from '@nestjs/common';
import multipart from '@fastify/multipart'; // Import the multipart plugin
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    rawBody: true,
    logger: new ConsoleLogger({ json: false, colors: true }),
  });

  app.register(multipart as any, {
    limits: {
      fileSize: 104857600, // 100MB
    },
  });
  app.useStaticAssets({
    root: join(__dirname, '..', 'public'),
    prefix: '/public/',
    index: false,
  });
  app.useGlobalFilters(new AllExceptionsHandler());

  const corsOrigins = (process.env.CORS_ORIGINS || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  app.enableCors({
    origin: corsOrigins.length > 0 ? corsOrigins : true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('scaffolddataclouder APIs')
    .setDescription('Documentación de las APIs de scaffolddataclouder')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = Number(process.env.PORT) || 7991;
  await app.listen(port, '0.0.0.0');
  console.log(`Server is running on port ${port} http://0.0.0.0:${port}`);
}

bootstrap();
