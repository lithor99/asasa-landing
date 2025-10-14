import type { BaseModel, PaginationModel, ResponseModel } from "../baseModel";
import type { MemberModel } from "../member";

export interface BonusModel extends BaseModel {
    memberId: string | null;
    status: string | null;
    amount: string | null;
    image?: string | null;
    currency: string | null;
    approvedBy: any | null;
    remark: string | null;
    member: MemberModel | null;
    approver: any | null;
    accountDetail: {
        id?: number;
        qrCode: string | null;
        remark: string | null;
        status: string | null;
        bankName: string | null;
        currency: string | null;
        accountName: string | null;
        accountImage: string | null;
        accountNumber: string | null;
    };
}

export interface BonusPaginationModel extends PaginationModel {
    status: {
        total: number;
        pending: number;
        approved: number;
        rejected: number;
    };
    rows: BonusModel[] | [];
}

export interface BonusResponseModel extends ResponseModel {
    data: BonusModel | BonusModel[] | BonusPaginationModel;
}
