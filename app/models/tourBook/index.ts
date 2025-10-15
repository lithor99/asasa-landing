import type { BaseModel, PaginationModel } from "../baseModel";
import type { Country } from "../tourPlace";
import type { TourPackageModel } from "../tourPackage";

export interface TourBookModel extends BaseModel {
    bookCode?: string;
    packageId?: number;
    travelerAmount?: number;
    price?: string;
    startDate?: Date;
    endDate?: Date;
    tourCategory?: string;
    fullName?: string;
    email?: string;
    phone?: string;
    status?: string;
    paymentStatus?: string;
    bankRefId?: null;
    bankResponse?: null;
    remark?: null;
    customerGrade?: null;
    countryCode?: string;
    createdAt?: Date;
    updatedAt?: Date;
    country?: Country;
    package?: TourPackageModel;
}

export interface TourBooksPaginationModel extends PaginationModel {
    rows: TourBookModel[] | [];
}
