export const MSG = {
    created: "Create successfully",
    updated: "Update successfully",
    deleted: "Delete successfully",
    canceled: "Cancel successfully",
    rejected: "Reject successfully",
    approved: "Approved successfully",
    confirmed: "Confirmed successfully",
    wrong: "Something went wrong",
};
export const REQUIRED = {
    empty: "Input is required",
};
export const DEFAULT_PAGINATION = {
    count: 0,
    pages: 0,
    currentPage: 0,
    nextPage: 0,
    previousPage: 0,
    rows: [],
};
export const STATUS_COLOR = {
    SAVED: "text-blue-300",
    PENDING: "text-warning",
    APPROVED: "text-success",
    BLOCKED: "text-danger",
    REJECTED: "text-error",
    ACTIVE: "text-success",
    INACTIVE: "text-danger",
    CANCELLED: "text-danger",
    CANCELED: "text-danger",
    DEFAULT: "text-secondary",
    PLAYING: "text-success",
    ENDED: "text-secondary",
    FAILED: "text-danger",
    NORMAL: "text-secondary",
    SUSPENDED: "text-danger",
    RESUMED: "text-orange-500",
    REQUESTING: "text-orange-500",
    ONLINE: "text-success",
    SELLED: "text-success",
    PLEDGED: "text-orange-500",
    OFFLINE: "text-danger",
    PENDING_LAND_DEED: "text-orange-500",
    PENDING_PAID: "text-warning",
    PAID: "text-success",
    PAYMENT_EXPIRED: "text-danger",
    PAYMENT_REJECTED: "text-danger",
    COMPLETED_LAND_DEED: "text-warning",
    CHECKED_LAND_DEED: "text-primary",
    REJECTED_LAND_DEED: "text-danger",
    CONFIRMED_LAND_DEED: "text-primary",
    PENDING_PAID_OWNER: "text-orange-500",
    COMPLETED: "text-success",
    PENDING_OTP: "text-gray-500",
};
export const STATUS_BG_COLOR = {
    SAVED: "bg-blue-300",
    PENDING: "bg-warning",
    APPROVED: "bg-success",
    BLOCKED: "bg-danger",
    REJECTED: "bg-error",
    ACTIVE: "bg-success",
    INACTIVE: "bg-danger",
    CANCELLED: "bg-danger",
    CANCELED: "bg-danger",
    DEFAULT: "bg-secondary",
    PLAYING: "bg-success",
    ENDED: "bg-secondary",
    FAILED: "bg-danger",
    NORMAL: "bg-secondary",
    SUSPENDED: "bg-danger",
    RESUMED: "bg-orange-500",
    REQUESTING: "bg-orange-500",
    ONLINE: "bg-success",
    SELLED: "bg-success",
    PLEDGED: "bg-orange-500",
    OFFLINE: "bg-danger",
    PENDING_LAND_DEED: "bg-orange-500",
    PENDING_PAID: "bg-warning",
    PAID: "bg-success",
    PAYMENT_EXPIRED: "bg-danger",
    PAYMENT_REJECTED: "bg-danger",
    COMPLETED_LAND_DEED: "bg-warning",
    CHECKED_LAND_DEED: "bg-primary",
    REJECTED_LAND_DEED: "bg-danger",
    CONFIRMED_LAND_DEED: "bg-primary",
    PENDING_PAID_OWNER: "bg-orange-500",
    COMPLETED: "bg-success",
};
export const PAGE_ITEMS = [5, 10, 20, 50, 100, 200, 500, 1000];
export const GENDER = [
    {
        value: "MALE",
        label: "MALE",
    },
    {
        value: "FEMALE",
        label: "FEMALE",
    },
];

export const C_TOUR_TYPE = [
    {
        value: "DOMESTIC",
        en: "Domestic",
        lo: "ທົວພາຍໃນປະເທດ",
    },
    {
        value: "INTERNATIONAL",
        en: "International",
        lo: "ທົວຕ່າງປະເທດ",
    },
];

export const C_TOUR_CATEGORY = [
    {
        value: "SINGLE",
        en: "Solo tour",
        lo: "ທົວພາຍໃນປະເທດ",
    },
    {
        value: "GROUP",
        en: "Group tour",
        lo: "ທົວຕ່າງປະເທດ",
    },
];

export const C_REGION = [
    {
        value: "NORTHERN",
        en: "Northern",
        lo: "ພາກເໜືອ",
        color: "bg-blue-600",
    },
    {
        value: "CENTER",
        en: "Central",
        lo: "ພາກກາງ",
        color: "bg-yellow-600",
    },
    {
        value: "SOUTH",
        en: "Southern",
        lo: "ພາກໃຕ້",
        color: "bg-green-600",
    },
];

export const  C_COUNTRY = [
    {
        value: "LA",
        en: "Laos",
        lo: "ປະເທດລາວ",
    }
];

export const LAND_MENUS_BOTTOM = [
    {
        title: "home",
        to: "/land/home",
        active: false,
        icon: "mage:dashboard",
        children: [],
    },
    {
        title: "valuation_checked",
        to: "/land/valuation",
        active: false,
        icon: "mingcute:auction-line",
        children: [],
    },
    {
        title: "add",
        to: "/owner/land/all/add",
        active: false,
        icon: "basil:add-solid",
        isClick: true,
        children: [],
    },
    {
        title: "view_history",
        to: "/land/viewed",
        active: false,
        icon: "iconamoon:history-fill",
        children: [],
    },
    {
        title: "exit",
        to: "/",
        active: false,
        icon: "ion:exit-outline",
        children: [],
    },
];
