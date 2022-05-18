import { plainToInstance } from 'class-transformer';

import { appDataSource } from '../../data-source';
import { PromocodeEntity } from './entity/promo.entity';
import { IAddPromoCode, IPageOptions, IPromoCode, IPromoCodeName, IRemovePromoCode } from './promo.interface';
import { PromocodeState } from './promocode.enum';

export class PromocodeRepository {
  async getListOfPromocodes(pageOptions: IPageOptions): Promise<PromocodeEntity[]> {
    let query = 'SELECT * FROM promocode';

    if (!pageOptions.page) {
      query = query.concat(' LIMIT ALL;');
    } else {
      const skip: number = (pageOptions.page - 1) * pageOptions.limit;
      query = query.concat(` LIMIT ${pageOptions.limit} OFFSET ${skip}`);
    }
    const promocodes: PromocodeEntity[] = await appDataSource.query(query);
    return plainToInstance(PromocodeEntity, promocodes);
  }

  async addPromoCode(promocode: IAddPromoCode): Promise<IPromoCode> {
    const newPromocode: PromocodeEntity[] = await appDataSource.query(
        `INSERT INTO promocode (name, percent, "isOneTime", "startDate", "endDate", "currentState")
          VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`,
        [
          promocode.name.toLowerCase(),
          promocode.percent,
          promocode.isOneTime,
          promocode.isOneTime ? new Date(promocode.startDate) : null,
          promocode.isOneTime ? new Date(promocode.endDate) : null,
          PromocodeState.ACTIVE,
        ],
    );
    return newPromocode[0];
  }

  async removePromoCode(promocode: IRemovePromoCode): Promise<Boolean> {
    const response = await appDataSource.query(
        `UPDATE promocode
        SET
          "currentState" = '${ PromocodeState.REMOVED }', 
          "deletedAt" = now(),
          "deletedReason" = $1
          WHERE name = $2`,
        [promocode.deletedReason, promocode.name],
    );
    return response[0];
  }

  async markPromoCodeAsUsed(promocodeName: IPromoCodeName): Promise<boolean> {
    const response = await appDataSource.query(
        `UPDATE promocode SET "usedDate" = now()
        WHERE name = $1 and "isOneTime" = true and "usedDate" is null
        RETURNING *`,
        [promocodeName.name],
    );
    return response[1];
  }

  async getPromoCodeByName(promocodeName: IPromoCodeName): Promise<IPromoCode> {
    const promocode = await appDataSource.query(
        'SELECT * FROM promocode WHERE name = $1',
        [promocodeName.name],
    );
    return promocode[0];
  }
}
