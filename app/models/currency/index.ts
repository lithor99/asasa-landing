import type { BaseModel, PaginationModel, ResponseModel } from "../baseModel";

export interface CurrencyModel extends BaseModel {
    code: string | null;
    symbol: string | null;
    qrCode?: string | null;
    name: Record<string, string>;
    mergeText?: { text: string; code: string; name: string; flag?: string }[];
}
export interface CurrencyPaginationModel extends PaginationModel {
    rows: CurrencyModel[] | [];
}

export interface CurrencyResponseModel extends ResponseModel {
    data: CurrencyModel | CurrencyModel[] | CurrencyPaginationModel;
}
