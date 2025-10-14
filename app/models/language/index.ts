import type { BaseModel, PaginationModel, ResponseModel } from "../baseModel";

export interface LanguageModel extends BaseModel {
    code: string | null;
    name: string | null;
    flag: string | null;
    text?: string;
    isActive: boolean;
    isMain: boolean;
}
export interface LanguagePaginationModel extends PaginationModel {
    rows: LanguageModel[] | [];
}

export interface LanguageResponseModel extends ResponseModel {
    data: LanguageModel | LanguageModel[] | LanguagePaginationModel;
}
