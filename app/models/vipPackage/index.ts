import type { BaseModel, PaginationModel, ResponseModel } from "../baseModel";

export interface VipPackageModel extends BaseModel {
    name: Record<string, string>;
    type: string | null;
    amount: string | null;
    percent: string | null;
    daysExpired: string | null;
    currency: string | null;
    acc?: string | null;
    detail?: string | null;
    style?: string | null;
    isExpand?: boolean;
}

export interface VipPackagePaginationModel extends PaginationModel {
    rows: VipPackageModel[] | [];
}

export interface VipPackageResponseModel extends ResponseModel {
    data: VipPackageModel | VipPackageModel[] | VipPackagePaginationModel;
}
