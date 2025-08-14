import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   // CORS সক্রিয় করা
  app.enableCors(); // এটি সব ডোমেইন থেকে রিকুয়েস্টকে অনুমতি দেবে

  await app.listen(4000);
}
bootstrap();
