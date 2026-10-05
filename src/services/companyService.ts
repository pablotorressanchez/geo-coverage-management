import type { ItemCollectionModel } from "../types/common/ItemCollectionModel"
import type { ItemModel } from "../types/common/ItemModel"
import type { RequestType } from "../types/common/RequestType"
import type { Company } from "../types/Company"
import type { Sucursal } from "../types/Sucursal"
import { commonService } from "./commonService"
import { fetchService } from "./fetchService"

export const companyService = {
    getCompanyById: async (resource: string) => {
        const request: RequestType = {
            url: `/companies/${resource}`,
            method: 'GET'
        }

        return await fetchService<ItemModel<Company>>(request);
    },
    getCompaniesByGroups: async (resource: string) => {
        const request: RequestType = {
            url: `/companies/group/${resource}`,
            method: 'GET'
        }

        return await fetchService<ItemCollectionModel<Company>>(request);
    },
    getBranchByCompany: async (resourceId: string) => {
        return await commonService.getSlsBranches<Sucursal>(resourceId, 'data');
    }
}