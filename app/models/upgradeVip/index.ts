import type { BaseModel, PaginationModel, ResponseModel } from "../baseModel";
import type { MemberModel } from "../member";

export interface UpgradeVipModel extends BaseModel {
    memberId: string | null;
    packageId: number | null;
    startDate?: string | null;
    expiredDate?: string | null;
    status: string | null;
    amount: string | null;
    image?: string | null;
    currency: string | null;
    bankRef: string | null;
    paymentDetail: {} | null;
    package?: any;
    approvedBy: any | null;
    remark: string | null;
    member: MemberModel | null;
    approver: any | null;
    type?: string;
}

export interface UpgradeVipPaginationModel extends PaginationModel {
    status: {
        total: number;
        pending: number;
        approved: number;
        rejected: number;
    };
    rows: UpgradeVipModel[] | [];
}

export interface UpgradeVipResponseModel extends ResponseModel {
    data: UpgradeVipModel | UpgradeVipModel[] | UpgradeVipPaginationModel;
}
