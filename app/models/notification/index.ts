import type { BaseModel, PaginationModel, ResponseModel } from "../baseModel";
export interface NotificationModel extends BaseModel {
    senderId: string | null;
    receiverId: string | null;
    title: string | null;
    body: string | null;
    content: string | null;
    path: string | null;
    color: string | null;
    isRead: string | null;
    isClear: string | null;
    isSuccess: string | null;
    sender: SenderMobel | null;
    receiver: SenderMobel | null;
}
export interface SenderMobel {
    profile: string | null;
    gender: string | null;
    nickname: string | null;
    firstName: string | null;
    lastName: string | null;
}

export interface NotificationPaginationModel extends PaginationModel {
    unReadCount: number | 0;
    unClearCount: number | 0;
    rows: NotificationModel[] | [];
}

export interface NotificationResponseModel extends ResponseModel {
    data: NotificationModel | NotificationModel[] | NotificationPaginationModel;
}
