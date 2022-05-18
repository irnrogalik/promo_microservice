import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PromocodeModule } from 'promo/promo.module';

@Module({
  imports: [
    PromocodeModule,
    ConfigModule.forRoot({ isGlobal: true }),
  ],
})
export class AppModule {}
