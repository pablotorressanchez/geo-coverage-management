import type { ItemCollectionModel } from "../types/common/ItemCollectionModel";
import type { RequestType } from "../types/common/RequestType"
import type { SelectValueModel } from "../types/common/SelectValueModel";
import { fetchService } from "./fetchService";
import lima_district from '../utils/json/lima_distritos.json';

export const commonService = {
    getGroups: async () => {
        const request: RequestType = {
            url: '/common/groups',
            method: 'GET'
        }

        return await fetchService<ItemCollectionModel<SelectValueModel>>(request);
    },
    getSlsBranches: async <T = SelectValueModel>(resourceId: string, type: 'select' | 'data' = 'select') => {
        const request: RequestType = {
            url: '/coverages/branches/company',
            method: 'POST',
            body: JSON.stringify({
                resourceId,
                type
            })
        };
        return await fetchService<ItemCollectionModel<T>>(request);
    },
    getSlsCoverages: async <T = SelectValueModel>(resourceId: string, type: 'select' | 'data' = 'select') => {
        const request: RequestType = {
            url: '/coverages/branch',
            method: 'POST',
            body: JSON.stringify({
                resourceId,
                type
            })
        };

        return await fetchService<ItemCollectionModel<T>>(request);
    },
    getDistricts: (district: string) => (lima_district.features
        .filter(({ properties: p }) => p.distrito.toLowerCase().includes(district.toLowerCase()))
        .map(({ properties: p }) => p.distrito))
}