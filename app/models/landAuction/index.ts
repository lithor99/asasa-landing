import type { BaseModel, PaginationModel, ResponseModel } from "../baseModel";
import type { MemberModel } from "../member";

export interface LandAuctionModel extends BaseModel {
    memberId: string | null;
    status: string | null;
    amount: string | null;
    lat: number | null;
    lng: number | null;
    paymentImage: string | null;
    responseImage: string | null;
    detail: string | null;
    approvedBy: any | null;
    member: MemberModel | null;
    approver: any | null;
}

export interface LandAuctionPaginationModel extends PaginationModel {
    status: {
        total: number;
        pending: number;
        approved: number;
        rejected: number;
    };
    rows: LandAuctionModel[] | [];
}

export interface LandAuctionResponseModel extends ResponseModel {
    data: LandAuctionModel | LandAuctionModel[] | LandAuctionPaginationModel;
}
