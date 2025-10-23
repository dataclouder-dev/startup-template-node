import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { AllExceptionsHandler } from './common/exception-hanlder.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConsoleLogger } from '@nestjs/common';
import multipart from '@fastify/multipart'; // Import the multipart plugin

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule, new FastifyAdapter(), {
    rawBody: true,
    logger: new ConsoleLogger({ json: false, colors: true }),
  });

  app.register(multipart);

  app.useGlobalFilters(new AllExceptionsHandler());

  app.enableCors({
    origin: true, // Or specify your frontend origin like 'http://localhost:4200'
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

  const port = 7991;
  await app.listen(port, '0.0.0.0');
  console.log('Server is running on port ' + port);
}

bootstrap();
