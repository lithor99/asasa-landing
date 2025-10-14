import type { BaseModel, PaginationModel } from "../baseModel";
export interface MenuModel extends BaseModel {
    name: string;
    routePath: string;
    routeFullPath: string;
    routeName: string;
    menuDeep: number | null;
    menuSort: number | null;
    menuIcon: string;
    active: boolean;
    notify: string | null;
    isShow: boolean;
    parentMenu: number | null;
    platform: string;
    abilities: string[];
    UserGroupPermission: Record<string, string>;
    UserPermission: Record<string, string>;
    children: {
        id: string;
        name: string;
        routePath: string;
        routeFullPath: string;
        routeName: string;
        menuDeep: number | null;
        menuSort: number | null;
        menuIcon?: string;
        active: boolean;
        notify: string | null;
        isShow: boolean;
        parentMenu: number | null;
        platform: string;
        abilities: {
            title: string;
            action: string;
        }[];
        createdAt?: Date | null | string;
        updatedAt?: Date | null | string;
    }[];
}

export interface MenuPaginationModel extends PaginationModel {
    rows: MenuModel[] | [];
}
