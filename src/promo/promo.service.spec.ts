import type { TestingModule } from '@nestjs/testing';
import { Test } from '@nestjs/testing';

import {
  listOfPromocodes,
  pageOptions,
  promocode,
  promocodeToRemove,
  promocodeName,
  promocodeToAdd,
} from './promocode.fixture';
import { PromocodeRepository } from './promo.repository';
import { PromocodeService } from './promo.service';

describe('Promocode Service', () => {
  let promocodeService: PromocodeService;

  beforeEach(async () => {
    const PromocodeRepositoryProvider = {
      provide: PromocodeRepository,
      useFactory: () => ({
        getListOfPromocodes: jest.fn(() => listOfPromocodes),
        addPromoCode: jest.fn(() => promocode),
        getPromoCodeByName: jest.fn(() => promocode),
        removePromoCode: jest.fn(() => true),
        markPromoCodeAsUsed: jest.fn(() => true),
        isPromoCodeExist: jest.fn(() => true),
        isPromoCodeValid: jest.fn(() => true),
      }),
    };

    const app: TestingModule = await Test.createTestingModule({
      providers: [PromocodeRepositoryProvider, PromocodeService],
    }).compile();

    promocodeService = app.get<PromocodeService>(PromocodeService);
  });

  describe('get promocode list', () => {
    it('should return list of promocodes', async () => {
      expect(await promocodeService.getListOfPromocodes(pageOptions)).toEqual(
          listOfPromocodes,
      );
    });
  });

  describe('add promocode', () => {
    it('should return created promocode', async () => {
      expect(await promocodeService.addPromoCode(promocodeToAdd)).toEqual(
          promocode,
      );
    });
  });

  describe('get promocode by name', () => {
    it('should return promocode', async () => {
      expect(await promocodeService.getPromoCodeByName(promocodeName)).toEqual(
          promocode,
      );
    });
  });

  describe('remove promocode', () => {
    it('should return successful result', async () => {
      expect(await promocodeService.removePromoCode(promocodeToRemove)).toEqual(
          true,
      );
    });
  });

  describe('mark promocode as used', () => {
    it('should return successful result', async () => {
      expect(await promocodeService.markPromoCodeAsUsed(promocodeName)).toEqual(
          true,
      );
    });
  });

  describe('check if promocode exist', () => {
    it('should return successful result', async () => {
      expect(await promocodeService.isPromoCodeExist(promocodeName)).toEqual(
          true,
      );
    });
  });

  describe('check is promocode valid', () => {
    it('should return true for promocode', async () => {
      expect(await promocodeService.isPromoCodeValid(promocodeName)).toEqual(
          true,
      );
    });
  });
});
