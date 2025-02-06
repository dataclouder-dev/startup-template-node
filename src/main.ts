import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { join } from 'path';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AllExceptionsHandler } from './common/exception-hanlder.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConsoleLogger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    rawBody: true,
    logger: new ConsoleLogger({
      json: true,
      colors: true,
    }),
  });
  app.useGlobalFilters(new AllExceptionsHandler());

  const config = new DocumentBuilder()
    .setTitle('scaffolddataclouder APIs')
    .setDescription('Documentación de las APIs de scaffolddataclouder')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();
  const port = 8080;
  await app.listen(port, '0.0.0.0');
  console.log('Server is running on port ' + port);
}

bootstrap();
