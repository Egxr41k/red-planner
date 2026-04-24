import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as coockieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix("api")
  app.use(coockieParser())
  app.enableCors(
    {
      origin: process.env.ALLOWED_ORIGIN,
      credentials: true,
      allowedHeaders: ['Content-Type', 'Authorization', 'set-cookie'],
      exposedHeaders: 'set-cookie'
    }
  )

  await app.listen(process.env.APPLICATION_PORT || 4200)
}
bootstrap();
