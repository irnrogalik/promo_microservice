import { Module } from '@nestjs/common';
import { PromocodeModule } from 'promo/promo.module';

@Module({
  imports: [PromocodeModule],
})
export class AppModule {}
