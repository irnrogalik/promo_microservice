import { plainToInstance } from 'class-transformer';

import { appDataSource } from '../../data-source';
import { PromocodeEntity } from './entity/promo.entity';
import { IAddPromoCode, IPromoCode, IPromoCodeName } from './promo.interface';

export class PromocodeRepository {
  async getProductList(): Promise<PromocodeEntity[]> {
    const promocodes: PromocodeEntity[] = await appDataSource.query(
        'SELECT * FROM promocode',
    );
    return plainToInstance(PromocodeEntity, promocodes);
  }

  async addPromoCode(promocode: IAddPromoCode): Promise<IPromoCode> {
    const newPromocode: PromocodeEntity[] = await appDataSource.query(
        `INSERT INTO promocode (name, percent, "isOneTime", "startDate", "endDate") 
      VALUES ($1, $2, $3, $4, $5) RETURNING *`,
        [
          promocode.name,
          promocode.percent,
          promocode.isOneTime,
          promocode.startDate,
          promocode.endDate,
        ],
    );
    return newPromocode[0];
  }

  async removePromoCode(promocodeName: IPromoCodeName): Promise<Boolean> {
    const response = await appDataSource.query(
        'DELETE FROM promocode WHERE name = $1', [promocodeName.name],
    );
    return response[0];
  }

  async markPromoCodeAsUsed(promocodeName: IPromoCodeName): Promise<Boolean> {
    const response = await appDataSource.query(
        'UPDATE promocode SET "isUsed" = true WHERE name = $1 RETURNING *', [promocodeName.name],
    );
    return response[0];
  }

  async getPromoCodeByName(promocodeName: IPromoCodeName): Promise<IPromoCode> {
    const promocode = await appDataSource.query(
        'SELECT * FROM promocode where name = $1', [promocodeName.name],
    );
    return promocode[0];
  }
}
