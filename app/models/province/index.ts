import type { BaseModel, PaginationModel, ResponseModel } from "../baseModel";
export interface ProvinceModel extends BaseModel {
    name: Record<string, string>;
    mergeText?: { text: string; code: string; name: string; flag?: string }[];
    lat: string | null;
    lng: string | null;
}

export interface ProvincePaginationModel extends PaginationModel {
    rows: ProvinceModel[] | [];
}

export interface ProvinceResponseModel extends ResponseModel {
    data: ProvinceModel | ProvinceModel[] | ProvincePaginationModel;
}
