import type { SelectedTopNavbarItem } from "../store/redux/topNavbarSlice";
import type { RequestType } from "../types/common/RequestType"
import { fetchService } from "./fetchService"

export const featureService: {[name: string]: <T>(param: SelectedTopNavbarItem) => Promise<T>} = {
    'branch': async <T>({ path, ...rest }: SelectedTopNavbarItem) => {
        const request: RequestType = {
            url: `/coverages/polygon/${path}`,
            method: 'POST',
            body: JSON.stringify(rest)
        }
        
        return await fetchService<T>(request);
    },
    'feature': async <T>({ path, ...rest }: SelectedTopNavbarItem) => {
        const request: RequestType = {
            url: `/coverages/polygon/${path}`,
            method: 'POST',
            body: JSON.stringify(rest)
        }

        return await fetchService<T>(request);
    },
}