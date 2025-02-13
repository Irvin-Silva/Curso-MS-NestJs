import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  //const app = await NestFactory.create(AppModule);
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: {
     port: +(process.env.PORT ?? 3001)
  }});
  //Realiza la validaciín para que no se pueda enviar un objeto que no cumpla con las reglas de validación
  app.useGlobalPipes(new ValidationPipe());
  //Se obtiene el puerto del archivo .env o se asigna el puerto 3001
  await app.listen();
  Logger.log(`Microservice is listening on port ${process.env.PORT}`);
}
bootstrap();
