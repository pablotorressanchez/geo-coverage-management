import type { StatusModel } from "./StatusModel.ts";

export interface ItemCollectionModel<T> extends StatusModel {
    items: T[]
}