export interface IPromoCode {
  id: string;
  name: string;
  createdAt: string;
  percent: number;
  isOneTime: boolean;
  usedDate?: string;
  startDate?: string;
  endDate?: string;
  deletedAt?: string;
  deletedReason?: string;
}

export interface IAddPromoCode {
  name: string;
  percent: number;
  isOneTime: boolean;
  startDate?: string;
  endDate?: string;
}

export interface IPromoCodeName {
  name: string;
}

export interface IRemovePromoCode {
  name: string;
  deletedReason: string;
}

export interface IPromoCodeBoolResponse {
  response: boolean;
}

export interface IPromocodeList {
  promocodes: IPromoCode[];
}

export interface IPageOptions {
  page: number;
  limit: number;
}
