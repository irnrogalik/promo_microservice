import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PromocodeModule } from 'promo/promo.module';
import { TypeOrmConfigService } from 'shared/services/type.orm.config.service';
import { SharedModule } from 'shared/shared.module';

@Module({
  imports: [
    PromocodeModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    TypeOrmModule.forRootAsync({
      imports: [SharedModule],
      useFactory: (typeOrmConfigService: TypeOrmConfigService) =>
        typeOrmConfigService.get(),
      inject: [TypeOrmConfigService],
    }),
  ],
})
export class AppModule {}
