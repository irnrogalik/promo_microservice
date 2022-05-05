import { NestFactory } from '@nestjs/core';
import type { MicroserviceOptions } from '@nestjs/microservices';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

import { appDataSource } from '../data-source';
import { AppModule } from './app.module';

async function bootstrap() {
  await appDataSource.initialize();

  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
      AppModule,
      {
        transport: Transport.GRPC,
        options: {
          package: 'promo',
          protoPath: join(__dirname, '../promo/promo.proto'),
        },
      },
  );
  app.listen();
}
bootstrap();
