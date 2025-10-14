import type { BaseModel, PaginationModel, ResponseModel } from "../baseModel";

export interface ObjectCategoryModel extends BaseModel {
    code: string | null;
    name: Record<string, string>;
    mergeText?: { text: string; code: string; name: string; flag?: string }[];
    icon: string | null;
    img: string | null;
    catalog: any[];
}
export interface ObjectCategoryPaginationModel extends PaginationModel {
    rows: ObjectCategoryModel[] | [];
}

export interface ObjectCategoryResponseModel extends ResponseModel {
    data: ObjectCategoryModel | ObjectCategoryModel[] | ObjectCategoryPaginationModel;
}
