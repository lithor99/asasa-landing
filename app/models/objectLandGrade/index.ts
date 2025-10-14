import type { BaseModel, PaginationModel, ResponseModel } from "../baseModel";

export interface ObjectLandGradeModel extends BaseModel {
    name: Record<string, string>;
    mergeText?: {
        text: string;
        code: string;
        name: string;
        flag?: string;
        isMain?: boolean;
    }[];
}
export interface ObjectLandGradePaginationModel extends PaginationModel {
    rows: ObjectLandGradeModel[] | [];
}

export interface ObjectLandGradeResponseModel extends ResponseModel {
    data:
        | ObjectLandGradeModel
        | ObjectLandGradeModel[]
        | ObjectLandGradePaginationModel;
}
