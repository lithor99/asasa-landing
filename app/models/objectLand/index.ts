import type { BaseModel, PaginationModel, ResponseModel } from "../baseModel";

export interface ObjectLandModel extends BaseModel {
  loading?: boolean;
  categoryId: string;
  typeId: string;
  gradeId: string;
  code: string | null;
  name: Record<string, string>;
  mergeText?: {
    text: string;
    code: string;
    name: string;
    flag?: string;
    isMain?: boolean;
  }[];
  area: string | null;
  prices: {
    unit: string | null;
    price: string | null;
    currency: string | null;
    totalPrice: string | null;
  }[];
  sysPercent: string;
  image: string | null;
  images: string[];
  remark: string | null;
  video: string | null;
  description: Record<string, string>;
  lat: string | null;
  lng: string | null;
  view: number | null;
  isValuation: boolean | null;
  isEmpty: boolean | null;
  status: string | null;
  searchVector: string | null;
  provinceId: string;
  districtId: string;
  village: string | null;
  deliveryPeriod: number | null;
  createdByMember: string | null;
  commissionPercent?: number | null;
  isAction: boolean;
  multiplePrice: {
    price: number | null;
    totalPrice: number | null;
    currency: string;
    currencyName: string;
  }[];
  descriptions: {
    text: string | null;
    code: string | null;
    name: string | null;
  }[];
  category?: {
    name: Record<string, string>;
  };
  type?: {
    name: Record<string, string>;
  };
  province?: {
    name: Record<string, string>;
  };
  district?: {
    name: Record<string, string>;
  };
  grade?: {
    name: Record<string, string>;
  };
}
export interface ObjectLandPaginationModel extends PaginationModel {
  rows: ObjectLandModel[] | [];
}

export interface ObjectLandResponseModel extends ResponseModel {
  data: ObjectLandModel | ObjectLandModel[] | ObjectLandPaginationModel;
}

export interface PopularResponseModel extends ResponseModel {
  data: PopularAndProvinceModel;
}

export interface ProvinceDataModel {
  id: number;
  name: any;
  lands: ObjectLandModel[];
}

export interface PopularAndProvinceModel extends BaseModel {
  popular: ObjectLandModel[] | [];
  provinces: ProvinceDataModel[] | [];
}
