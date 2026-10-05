import type { RequestType } from "../types/common/RequestType";
import type { StatusModel } from "../types/common/StatusModel";

const baseURL: string = import.meta.env.VITE_API_URL;

const defaultStatus: StatusModel = {
    statusCode: '00',
    statusMessage: 'No pudimos conectarnos al servidor.'
}

export const fetchService = async <T>({ url, ...request }: RequestType) => {
    const requestInit = {
        ...request,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const response = await fetch(`${baseURL}${url}`, requestInit as Partial<RequestInit>);
    if (!response.ok)
        return new Promise<T>((_, reject) => reject((
            {
                ...defaultStatus,
                item: null,
                items: []
            }
        )))
    
    return await response.json() as T;
}

