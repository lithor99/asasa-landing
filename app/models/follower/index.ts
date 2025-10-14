import type { BaseModel, PaginationModel } from "../baseModel";

export interface FollowerModel extends BaseModel {
    profile?: string;
    fullName?: string;
    email?: string;
    phone?: string;
}

export interface FollowerPaginationModel extends PaginationModel {
    rows: FollowerModel[] | [];
}

