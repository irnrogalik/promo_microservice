import type { IPromoCode } from 'promo/promo.interface';
import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'promocode' })
export class PromocodeEntity implements IPromoCode {
  @PrimaryGeneratedColumn('uuid')
    id: string;

  @Column()
    name: string;

  @CreateDateColumn()
    createdAt: string;

  @Column()
    percent: number;

  @Column()
    isOneTime: boolean;

  @Column()
    usedDate: string | null;

  @Column()
    startDate: string | null;

  @Column()
    endDate: string | null;

  @DeleteDateColumn()
    deletedAt: string | null;

  @Column()
    deletedReason: string | null;
}
