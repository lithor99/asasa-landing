import type { BaseModel, PaginationModel, ResponseModel } from "../baseModel";

export interface BankAccountModel extends BaseModel {
    bankName: string | null;
    accountName: string | null;
    accountNumber: string | null;
    currency: string | null;
    accountImage: string | null;
    qrCode: string | null;
    status?: string;
    loading?: boolean;
    isAction?: boolean;
}
export interface BankAccountPaginationModel extends PaginationModel {
    rows: BankAccountModel[] | [];
}

export interface BankAccountResponseModel extends ResponseModel {
    data: BankAccountModel | BankAccountModel[] | BankAccountPaginationModel;
}
