import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

import { IAddPromoCode, IPageOptions, IPromoCode, IPromoCodeName, IRemovePromoCode } from './promo.interface';
import { PromocodeRepository } from './promo.repository';

@Injectable()
export class PromocodeService {
  constructor(private promocodeRepository: PromocodeRepository) {}

  async getListOfPromocodes(pageOptions: IPageOptions): Promise<IPromoCode[]> {
    try {
      const promocodes: IPromoCode[] =
      await this.promocodeRepository.getListOfPromocodes(pageOptions);
      return promocodes;
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async addPromoCode(promocode: IAddPromoCode): Promise<IPromoCode> {
    try {
      const newPromocode: IPromoCode =
        await this.promocodeRepository.addPromoCode(promocode);
      return newPromocode;
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async removePromoCode(promocode: IRemovePromoCode): Promise<boolean> {
    try {
      if (!(await this.promocodeRepository.removePromoCode(promocode))) {
        throw new RpcException(`The promocode ${promocode.name} not found.`);
      }
      return true;
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async markPromoCodeAsUsed(promocodeName: IPromoCodeName): Promise<boolean> {
    try {
      const result = await this.promocodeRepository.markPromoCodeAsUsed(promocodeName);
      return result;
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async isPromoCodeValid(promocodeName: IPromoCodeName): Promise<boolean> {
    try {
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
    } catch (e) {
      throw new RpcException(e);
    }
  }

  async isPromoCodeExist(promocodeName: IPromoCodeName): Promise<boolean> {
    try {
      const promocode: IPromoCode = await this.promocodeRepository.getPromoCodeByName(promocodeName);
      return promocode && promocode?.name ? true : false;
    } catch (e) {
      throw new RpcException(e);
    }
  }
}
