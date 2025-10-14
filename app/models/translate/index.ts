import type { BaseModel, PaginationModel, ResponseModel } from "../baseModel";
type RoleType = "ADMIN" | "AGENT" | "MEMBER";

export interface TranslateModel extends BaseModel {
    key: string | null;
    text: Record<string, string>;
    type: RoleType[];
    mergeText?: { text: string; code: string; name: string; flag?: string }[];
}
export interface TranslatePaginationModel extends PaginationModel {
    rows: TranslateModel[] | [];
}

export interface TranslateResponseModel extends ResponseModel {
    data:
        | TranslateModel
        | TranslateModel[]
        | TranslatePaginationModel
        | Record<string, string>;
}
