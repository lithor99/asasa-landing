import type { BaseModel, PaginationModel, ResponseModel } from "../baseModel";

export interface ObjectTypeModel extends BaseModel {
    code: string | null;
    name: Record<string, string>;
    mergeText?: {
        text: string;
        code: string;
        name: string;
        flag?: string;
        isMain?: boolean;
    }[];
    icon: string | null;
    img: string | null;
}
export interface ObjectTypePaginationModel extends PaginationModel {
    rows: ObjectTypeModel[] | [];
}

export interface ObjectTypeResponseModel extends ResponseModel {
    data: ObjectTypeModel | ObjectTypeModel[] | ObjectTypePaginationModel;
}
