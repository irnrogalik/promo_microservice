import { Injectable, NotFoundException } from '@nestjs/common';

import { IAddPromoCode, IPageOptions, IPromoCode, IPromoCodeName, IRemovePromoCode } from './promo.interface';
import { PromocodeRepository } from './promo.repository';

@Injectable()
export class PromocodeService {
  constructor(private promocodeRepository: PromocodeRepository) {}

  async getListOfPromocodes(pageOptions: IPageOptions): Promise<IPromoCode[]> {
    const promocodes: IPromoCode[] =
      await this.promocodeRepository.getListOfPromocodes(pageOptions);
    return promocodes;
  }

  async addPromoCode(promocode: IAddPromoCode): Promise<IPromoCode> {
    const newPromocode: IPromoCode =
      await this.promocodeRepository.addPromoCode(promocode);
    return newPromocode;
  }

  async removePromoCode(promocode: IRemovePromoCode): Promise<boolean> {
    if (!(await this.promocodeRepository.removePromoCode(promocode))) {
      throw new NotFoundException(
          `The promocode ${promocode.name} not found.`,
      );
    }
    return true;
  }

  async markPromoCodeAsUsed(promocodeName: IPromoCodeName): Promise<boolean> {
    const result = await this.promocodeRepository.markPromoCodeAsUsed(promocodeName);
    return result;
  }

  async isPromoCodeValid(promocodeName: IPromoCodeName): Promise<boolean> {
    const promocode: IPromoCode = await this.promocodeRepository.getPromoCodeByName(promocodeName);
    if (promocode.deletedAt !== null) return false;
    if (promocode.isOneTime) return promocode.usedDate === null ? true : false;
    if (promocode.startDate !== null && promocode.endDate !== null) {
      const now = new Date(Date.now());
      const startDate = new Date(promocode.startDate);
      const endDate = new Date(promocode.endDate);

      if (now > startDate && now < endDate) {
        return true;
      } else {
        this.removePromoCode({ name: promocode.name, deletedReason: 'Promo code has expired' });
        return false;
      }
    }
    return false;
  }

  async isPromoCodeExist(promocodeName: IPromoCodeName): Promise<boolean> {
    const promocode: IPromoCode = await this.promocodeRepository.getPromoCodeByName(promocodeName);
    return promocode && promocode?.name ? true : false;
  }
}
