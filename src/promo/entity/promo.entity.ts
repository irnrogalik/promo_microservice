import type { IPromoCode } from 'promo/promo.interface';
import { PromocodeState } from 'promo/promocode.enum';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'promocode' })
export class PromocodeEntity implements IPromoCode {
  @PrimaryGeneratedColumn()
    id: string;

  @Column()
    name: string;

  @Column()
    createdAt: string;

  @Column()
    percent: number;

  @Column()
    currentState: PromocodeState;

  @Column()
    isOneTime: boolean;

  @Column()
    usedDate: string;

  @Column()
    startDate: string;

  @Column()
    endDate: string;

  @Column()
    deletedAt: string;

  @Column()
    deletedReason: string;
}
