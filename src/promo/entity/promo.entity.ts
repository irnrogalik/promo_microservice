import type { IPromoCode } from 'promo/promo.interface';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'promocode' })
export class PromocodeEntity implements IPromoCode {
  @PrimaryGeneratedColumn()
    id: string;

  @Column()
    name: string;

  @Column()
    percent: number;

  @Column()
    isUsed: boolean;

  @Column()
    isOneTime: boolean;

  @Column()
    startDate: string;

  @Column()
    endDate: string;
}
