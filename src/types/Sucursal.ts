import type { BaseModel } from "./common/BaseModel";
import type { Coordinates } from "./common/Coordinates";

export interface Sucursal extends BaseModel, Coordinates {
    companyId: string;
    sucursalCode: string;
    description: string;
    direction: string;
}