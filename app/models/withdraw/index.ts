import type { BaseModel, PaginationModel, ResponseModel } from "../baseModel";

export interface WithdrawModel extends BaseModel {
    memberId: string;
    agentId: string;
    amount: number;
    transferAmount: number;
    rate?: number;
    status: "APPROVED" | "PENDING" | "REJECTED" | "CANCELED";
    image: string | null;
    approveByBo: any;
    approveByAgent: string;
    remark: string | null;
    accountDetail: Record<string, string>;
    member: {
        profile: string | null;
        gender: "MALE" | "FEMALE";
        fullName: string;
        nickName: string;
        phone: string;
        bankAccount: {
            bankName: string;
            currency: string;
            accountName: string;
            accountImage: string;
            accountNumber: string;
        };
        kycStatus: EKycStatus;
        status: EMemberStatus;
        country: {
            name: Record<string, string>;
        };
    };
    approverBo: { fullName: string; profile: string | null; phone: string };
    approverAgent: {
        fullName: string;
        profile: string | null;
        phone: string;
    };
    agent: {
        agentName: string | null;
        countryCode?: string | null;
        profile?: string | null;
        phone?: string | null;
        status?: string;
    };
    exchangeRate?: {
        currency: string | null;
        rate: number;
    };
}
export interface WithdrawPaginationModel extends PaginationModel {
    status: {
        total: number;
        pending: number;
        approved: number;
        rejected: number;
        canceled: number;
    };
    rows: WithdrawModel[] | [];
}

export interface WithdrawResponseModel extends ResponseModel {
    data: WithdrawModel | WithdrawModel[] | WithdrawPaginationModel;
}
