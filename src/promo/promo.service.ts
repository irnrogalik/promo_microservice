import { Injectable, NotFoundException } from '@nestjs/common';

import { IAddPromoCode, IPromoCode, IPromoCodeName } from './promo.interface';
import { PromocodeRepository } from './promo.repository';

@Injectable()
export class PromocodeService {
  constructor(private promocodeRepository: PromocodeRepository) {}
  async getListOfPromocodes(): Promise<IPromoCode[]> {
    const promocodes: IPromoCode[] =
      await this.promocodeRepository.getProductList();
    return promocodes;
  }

  async addPromoCode(promocode: IAddPromoCode): Promise<IPromoCode> {
    const newPromocode: IPromoCode =
      await this.promocodeRepository.addPromoCode(promocode);
    return newPromocode;
  }

  async removePromoCode(promocodeName: IPromoCodeName): Promise<boolean> {
    if (!(await this.promocodeRepository.removePromoCode(promocodeName))) {
      throw new NotFoundException(
          `The promocode with name ${promocodeName} not found.`,
      );
    }
    return true;
  }

  async markPromoCodeAsUsed(promocodeName: IPromoCodeName): Promise<boolean> {
    await this.promocodeRepository.markPromoCodeAsUsed(promocodeName);
    return true;
  }

  async isPromoCodeValid(promocodeName: IPromoCodeName): Promise<boolean> {
    const promocode: IPromoCode = await this.promocodeRepository.getPromoCodeByName(promocodeName);
    return promocode && promocode.isUsed === false ? true : false;
  }
}
