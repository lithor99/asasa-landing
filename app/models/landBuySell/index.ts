import type { BaseModel, PaginationModel, ResponseModel } from "../baseModel";
import type { ObjectLandModel } from "../objectLand";
interface buyerModel {
    profile?: string | null;
    gender?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    village?: string | null;
    nickname?: string | null;
    phone?: string | null;
    username?: string | null;
    birthday?: string | null;
    email?: string | null;
    province?: {
        name: Record<string, string>;
    };
    district?: {
        name: Record<string, string>;
    };
}
export interface LandBuySellModel extends BaseModel {
    landId: string;
    amount: string | null;
    status: ELandBuySellStatus;
    currency: string | null;
    expiredPayment: string | null;
    paymentTimes: number | null;
    paidImage?: string | null;
    landDeedImage?: string | null;
    refundImage?: string | null;
    remark: string | null;
    buyerId: string | null;
    memberOwnerId: string | null;
    userOwnerId: string | null;
    approvedBy: number | null;
    land?: ObjectLandModel;
    buyer?: buyerModel;
    deliveryDate?: string | null;
    memberOwner: {
        profile: string | null;
        gender: string | null;
        firstName: string | null;
        lastName: string | null;
    };
    approver: {
        profile: string | null;
        gender: string | null;
        fullName: string | null;
    };
    payments: {
        image: string | null;
        amount: string | null;
        times: number | null;
        paymentPercent: string | null;
        status: string | null;
        approver: {
            profile: string | null;
            gender: string | null;
            fullName: string | null;
        };
    }[];
    isActive: boolean; // For front-end use only
}
export interface LandBuySellPaginationModel extends PaginationModel {
    status: {
        total: number;
        pending: number;
        approved: number;
        rejected: number;
        canceled: number;
    };
    rows: LandBuySellModel[] | [];
}

export interface LandBuySellResponseModel extends ResponseModel {
    data: LandBuySellModel | LandBuySellModel[] | LandBuySellPaginationModel;
}
