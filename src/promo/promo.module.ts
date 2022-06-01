import { Module } from '@nestjs/common';

import { PromocodeController } from './promo.controller';
import { PromocodeRepository } from './promo.repository';
import { PromocodeService } from './promo.service';

@Module({
  imports: [],
  controllers: [PromocodeController],
  exports: [PromocodeService],
  providers: [PromocodeService, PromocodeRepository],
})
export class PromocodeModule {}
