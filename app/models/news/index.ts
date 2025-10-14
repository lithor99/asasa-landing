import type { BaseModel, PaginationModel, Name, Detail } from "../baseModel";


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


export interface NewsModel extends BaseModel  {
    name?:        Name;
    detail?:      Detail;
    image?:       string;
    images?:      any[];
    region?:      string;
    views?:       number;
}


export interface NewsPaginationModel extends PaginationModel {
    rows: NewsModel[] | [];
}


