export enum EUserStatus {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
}
export enum EGender {
    MALE = "MALE",
    FEMALE = "FEMALE",
}
export enum EMemberStatus {
    ACTIVE = "ACTIVE",
    BLOCKED = "BLOCKED",
    CANCELED = "CANCELED",
}

export enum EDocumentType {
    ID_CARD = "ID_CARD",
    FAMILY_BOOK = "FAMILY_BOOK",
    PASSPORT = "PASSPORT",
}

export enum EUserType {
    MEMBER = "MEMBER",
    AGENT = "AGENT",
    ADMIN = "ADMIN",
}
export enum EPlatform {
    MEMBER = "MEMBER",
    AGENT = "AGENT",
    ADMIN = "ADMIN",
}

export enum ETransactionType {
    WALLET_IN = "WALLET_IN",
    WALLET_OUT = "WALLET_OUT",
}

export enum EAgentTransactionType {
    WALLET_IN = "WALLET_IN",
    WALLET_OUT = "WALLET_OUT",
}

export enum ETransactionIo {
    BO_TO_WALLET = "BO_TO_WALLET",
    BONUS_TO_WALLET = "BONUS_TO_WALLET",
    WALLET_TO_WITHDRAW = "WALLET_TO_WITHDRAW",
}

export enum EAgentTransactionIo {
    BO_TO_WALLET = "BO_TO_WALLET",
    WALLET_TO_MEMBER = "WALLET_TO_MEMBER",
    MEMBER_TO_WALLET = "MEMBER_TO_WALLET",
}

export enum ETransactionStatus {
    SUCCESS = "SUCCESS",
    FAILED = "FAILED",
}
export enum EWithdrawalStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    CANCELED = "CANCELED",
    REJECTED = "REJECTED",
}

export enum EWithdrawalType {
    AGENT = "AGENT",
    ADMIN = "ADMIN",
}

export enum EDepositType {
    AGENT = "AGENT",
    ADMIN = "ADMIN",
}

export enum EKycStatus {
    DEFAULT = "DEFAULT",
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
}

export enum EMemberDepositStatus {
    PENDING = "PENDING",
    APPROVED = "APPROVED",
    REJECTED = "REJECTED",
    CANCELED = "CANCELED",
}

export enum ELandStatus {
    ONLINE = "ONLINE",
    SELLED = "SELLED",
    PLEDGED = "PLEDGED",
    OFFLINE = "OFFLINE",
    PENDING = "PENDING",
}

export enum ELandBuySellStatus {
    PENDING = "PENDING", //pending approve for first payment
    PLEDGED = "PLEDGED", //approved first payment for 1% = pledge
    PENDING_LAND_DEED = "PENDING_LAND_DEED", //approved first or second payment
    PENDING_PAID = "PENDING_PAID", //pending approved for second or third payment
    PAID = "PAID", //paid all
    PAYMENT_EXPIRED = "PAYMENT_EXPIRED", //payment expired if first paid is pledge
    CANCELED = "CANCELED", //canceled for hidden the items for back-end
    REJECTED = "REJECTED", //rejected for first payment
    COMPLETED_LAND_DEED = "COMPLETED_LAND_DEED", //owner completed land deed
    CHECKED_LAND_DEED = "CHECKED_LAND_DEED", //after owner complete land deed then admin check the land deed
    REJECTED_LAND_DEED = "REJECTED_LAND_DEED",
    CONFIRMED_LAND_DEED = "CONFIRMED_LAND_DEED", // buyer confirm got land deed
    COMPLETED = "COMPLETED", //completed for both side buyer and owner
    PAYMENT_REJECTED = "PAYMENT_REJECTED", //completed for both side buyer and owner
    PENDING_PAID_OWNER = "PENDING_PAID_OWNER"
}
