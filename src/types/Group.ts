import type { BaseModel } from "./common/BaseModel";

export interface Group extends BaseModel {
    groupCode: string;
    description: string;
}