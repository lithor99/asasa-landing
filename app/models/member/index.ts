import type { BaseModel, PaginationModel, ResponseModel } from "../baseModel";
import type { MenuModel } from "../menu";

export interface MemberModel extends BaseModel {
    code?: string;
    provinceId: string;
    districtId: string;
    village: string | null;
    email: string | null;
    profile: string | null;
    picture: string | null;
    gender: EGender;
    nickname?: string;
    firstName: string | null;
    lastName: string | null;
    phone: string | null;
    username: string | null;
    birthday: string | null;
    status: EMemberStatus;
    documentType: string | null;
    documentNo: string | null;
    documentFile: string[];
    remark: string | null;
    kycStatus: EKycStatus;
    expiredVip?: string | null;
    isExpired?: boolean;
    menus?: MenuModel[];
    bankAccount: {
        qrCode: string | null;
        bankName: string | null;
        currency: string | null;
        accountName: string | null;
        accountImage: string | null;
        accountNumber: string | null;
    }[];
    province?: {
        name: Record<string, string>;
    };
    district?: {
        name: Record<string, string>;
    };
    wallet: WalletModel[] | [];
}

export interface WalletModel {
    currency: string | null;
    wallet: string | null;
}
export interface MemberPaginationModel extends PaginationModel {
    status: {
        total: number;
        active: number;
        blocked: number;
        canceled: number;
    };
    kycStatus: {
        total: number;
        default: number;
        pending: number;
        approved: number;
        rejected: number;
    };
    rows: MemberModel[] | [];
}

export interface MemberResponseModel extends ResponseModel {
    data: MemberModel | MemberModel[] | MemberPaginationModel;
}
