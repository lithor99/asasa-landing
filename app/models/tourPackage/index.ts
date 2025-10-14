import type { BaseModel, PaginationModel, Name, Detail } from "../baseModel";



export interface TourPackageModel extends BaseModel {
    name?: Name;
    detail?: Detail;
    image?: string;
    images?: string[];
    pricePerPerson?: string;
    pricePerGroup?: string;
    groupAmount?: number
    status?: string;
    tourType?: string;
    tourCategory?: string;
    travelDays?: number;
}

export interface TourPackagePaginationModel extends PaginationModel {
    rows: TourPackageModel[] | [];
}

