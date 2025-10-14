import type { ResponseModel } from "../baseModel";
export interface DashboardModel {
    land: {
        total: number;
        offline: number;
        online: number;
        pledged: number;
        selled: number;
        selling: number;
        pending: number;
        totalAmount: Record<string, Record<string, string>>;
        offlineAmount: Record<string, Record<string, string>>;
        onlineAmount: Record<string, Record<string, string>>;
        pledgedAmount: Record<string, Record<string, string>>;
        selledAmount: Record<string, Record<string, string>>;
        sellingAmount: Record<string, Record<string, string>>;
        pendingAmount: Record<string, Record<string, string>>;
    };
}

export interface DashboardResponseModel extends ResponseModel {
    data: DashboardModel;
}
