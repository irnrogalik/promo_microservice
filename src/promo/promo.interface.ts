export interface IPromoCode {
  id: string;
  name: string;
  percent: number;
  isUsed: boolean;
  isOneTime: boolean;
  startDate: string;
  endDate: string;
}

export interface IAddPromoCode {
  name: string;
  percent: number;
  isOneTime: boolean;
  startDate: string;
  endDate: string;
}

export interface IPromoCodeName {
  name: string;
}

export interface IPromoCodeBoolResponse {
  response: boolean;
}

export interface IPromocodeList {
  promocodes: IPromoCode[];
}
