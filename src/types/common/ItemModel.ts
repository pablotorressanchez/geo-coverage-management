import type { StatusModel } from "./StatusModel.ts";

export interface ItemModel<T> extends StatusModel {
    item: T | null;
}