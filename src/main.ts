import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    validationError: { target: false, value: false }
  }));
  app.setGlobalPrefix('api/v1');

  const options = new DocumentBuilder()
    .setTitle('MA12 CV')
    .setDescription('The MA12 CV API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);

  await app.listen(4000);
}
bootstrap();
