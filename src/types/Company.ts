import type { BaseModel } from "./common/BaseModel";

export interface Company extends BaseModel {
    groupId: string;
    groupName: string;
    ruc: string;
    companyName: string;
    companyCode: string;
}