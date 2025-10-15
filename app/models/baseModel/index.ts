export interface BaseModel {
    id: any;
    createdBy?: string | null;
    updatedBy?: string | null;
    createdAt?: Date | null | string;
    updatedAt?: Date | null | string;
}
export interface PaginationModel {
    count: number;
    pages: number;
    currentPage: number;
    nextPage: number | null;
    previousPage: number | null;
}
export interface PaginationQueryModel {
    page?: number;
    limit?: number;
    search?: string;
}

export interface ResponseModel {
    success: boolean;
    message: string;
    code: number;
}

export interface Address {
    en?: string;
    lo?: string;
}
export interface Name {
    en?: string;
    lo?: string;
}

export interface Detail {
    en?: string;
    lo?: string;
}