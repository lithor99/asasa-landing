import type { BaseModel, PaginationModel, ResponseModel } from "../baseModel";

export interface DistrictModel extends BaseModel {
    provinceId: string;
    name: Record<string, string>;
    mergeText?: { text: string; code: string; name: string; flag?: string }[];
    lat: string | null;
    lng: string | null;
    province?: {
        name: Record<string, string>;
        lat: string | null;
        lng: string | null;
    };
}

export interface DistrictPaginationModel extends PaginationModel {
    rows: DistrictModel[] | [];
}

export interface DistrictResponseModel extends ResponseModel {
    data: DistrictModel | DistrictModel[] | DistrictPaginationModel;
}
