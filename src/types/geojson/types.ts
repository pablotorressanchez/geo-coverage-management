export type type = PointModel['type'] | LineStringModel['type'] | PolygonModel['type'] | FeatureModel['type'];
export type GeomType = PointModel | LineStringModel | PointModel | Object;

export type Position = number[];

export interface StyleModel {
    fillOpacity: number;
    color: string;
    strokeOpacity: number;
    fillColor: string;
    clickable: boolean;
}

export interface Properties {
    id: string;
    name: string;
    popupContent: string;
    isBeginEdited: boolean;
    [name: string]: any;
}

export interface PointModel {
    type: "Point";
    coordinates: Position;
}

export interface LineStringModel {
    type: "LineString";
    coordinates: Position[];
}

export interface PolygonModel {
    type: 'Polygon';
    coordinates: Position[][];

}

export interface FeatureModel<G extends GeomType | null = GeomType> {
    type: 'Feature';
    id?: string | number | undefined;
    properties: Properties;
    geometry: G;
    style: StyleModel;
} 

export interface FeatureCollectionModel<G extends GeomType | null = GeomType> {
    type: 'FeatureCollection';
    features: Array<FeatureModel<G>>

}

export function polygonStyle() {
    const rndColor: string = '#' + Math.floor(Math.random() * 16777215).toString(16);

    return {
        fillOpacity: 0.45,
        color: rndColor,
        strokeOpacity: 4,
        fillColor: rndColor,
        clickable: true
    } as StyleModel;
}