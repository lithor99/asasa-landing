import type { BaseModel, PaginationModel, Name, Detail, Address } from "../baseModel";


export interface Country {
    code?:         string;
    name?:         Name;
    flag?:         string;
    phoneCode?:    string;
    currencyCode?: string;
    currencySign?: string;
    createdAt?:    Date;
    updatedAt?:    Date;
}


export interface TourPlaceModel extends BaseModel  {
    countryCode?: string;
    name?:        Name;
    address?:     Address;
    detail?:      Detail;
    image?:       string;
    images?:      any[];
    region?:      string;
    views?:       number;
    country?:     Country;
}


export interface TourPlacePaginationModel extends PaginationModel {
    rows: TourPlaceModel[] | [];
}


