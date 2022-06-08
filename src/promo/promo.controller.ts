import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';

import type { IPageOptions, IPromoCode, IPromocodeList, IPromoCodeName, IRemovePromoCode } from './promo.interface';
import { IAddPromoCode, IPromoCodeBoolResponse } from './promo.interface';
import { PromocodeService } from './promo.service';

@Controller()
export class PromocodeController {
  constructor(private readonly promoService: PromocodeService) {}

  @GrpcMethod('PromoCodeService', 'GetListOfPromocodes')
  async getListOfPromocodes(pageOptions: IPageOptions): Promise<IPromocodeList> {
    const promocodes: IPromoCode[] =
      await this.promoService.getListOfPromocodes(pageOptions);
    return { promocodes };
  }

  @GrpcMethod('PromoCodeService', 'AddPromoCode')
  async addPromoCode(promocode: IAddPromoCode): Promise<IPromoCode> {
    const newPromocode: IPromoCode = await this.promoService.addPromoCode(promocode);
    return newPromocode;
  }

  @GrpcMethod('PromoCodeService', 'RemovePromoCode')
  async removePromoCode(promocode: IRemovePromoCode): Promise<IPromoCodeBoolResponse> {
    const response: boolean = await this.promoService.removePromoCode(promocode);
    return { response: response };
  }

  @GrpcMethod('PromoCodeService', 'IsPromoCodeValid')
  async isPromoCodeValid(promocodeName: IPromoCodeName): Promise<IPromoCodeBoolResponse> {
    const response: boolean = await this.promoService.isPromoCodeValid(promocodeName);
    return { response: response };
  }

  @GrpcMethod('PromoCodeService', 'MarkPromoCodeAsUsed')
  async markPromoCodeAsUsed(promocodeName: IPromoCodeName): Promise<IPromoCodeBoolResponse> {
    const response: boolean = await this.promoService.markPromoCodeAsUsed(promocodeName);
    return { response: response };
  }

  @GrpcMethod('PromoCodeService', 'IsPromoCodeExist')
  async isPromoCodeExist(promocodeName: IPromoCodeName): Promise<IPromoCodeBoolResponse> {
    const response: boolean = await this.promoService.isPromoCodeExist(promocodeName);
    return { response: response };
  }

  @GrpcMethod('PromoCodeService', 'GetPromoCodeByName')
  async getPromoCodeByName(promocodeName: IPromoCodeName): Promise<IPromoCode> {
    const promocode: IPromoCode = await this.promoService.getPromoCodeByName(promocodeName);
    return promocode;
  }
}
