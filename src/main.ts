import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Set the global prefix to 'api'
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
  Logger.log(`Api running on http://localhost:${process.env.PORT ?? 3000}`, 'Bootstrap');
}
bootstrap();
