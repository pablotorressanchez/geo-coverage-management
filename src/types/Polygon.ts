import type { BaseModel } from "./common/BaseModel";

export interface Polygon extends BaseModel {
    sucursalId: string;
    sucursalCode: string;
    description: string;
    name: string;
    polygonDesc: string;
    type: string;
    geom: string;
}