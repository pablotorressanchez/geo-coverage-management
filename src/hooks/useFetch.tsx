import { useEffect, useState } from "react";
import type { RequestType } from "../types/common/RequestType";
import type { ItemCollectionModel } from "../types/common/ItemCollectionModel";
import type { ItemModel } from "../types/common/ItemModel";

const baseURL:string = 'http://localhost:3002/api/v1';

export function useFetch<T>({ url, ...request }: RequestType) {
    const [data, setData] = useState<Partial<T>>({}); // useState<T | null>(null) || useState<T>({} as T)
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<unknown>(null);

    const requestInit = {
        ...request,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    useEffect(() => {
        const fetchData = () => {
            fetch(`${baseURL}${url}`, requestInit as Partial<RequestInit>)
                .then((response) => response.json())
                .then((data) => setData(data))
                .catch((err) => setError(err))
                .finally(() => setLoading(false));
        }
        fetchData();
    }, [url]);

    return { data, loading, error };
}

export function useFetchItem<T>({ url, ...request }: RequestType) {
    const [data, setData] = useState<ItemModel<T>>({
        item: null,
        statusCode: "OK",
        statusMessage: "Request procesado."
    });
    const [loading, setLoading] = useState<boolean>(true);

    const requestInit = {
        ...request,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    useEffect(() => {
        const fetchData = () => {
            fetch(`${baseURL}${url}`, requestInit as Partial<RequestInit>)
                .then((response) => response.json())
                .then((data) => setData(data))
                .catch((_) => {
                    setData((prev) => {
                        return {...prev, statusCode: '00', statusMessage: 'No pudimos conectarnos con el servidor'}
                    })
                })
                .finally(() => setLoading(false));
        }
        fetchData();
    }, [url]);

    return { data, loading };
}

export function useFetchCollection<T>({ url, ...request }: RequestType) {
    const [data, setData] = useState<ItemCollectionModel<T>>({
        items: [],
        statusCode: "OK",
        statusMessage: "Request procesado."
    });
    const [loading, setLoading] = useState<boolean>(true);

    const requestInit = {
        ...request,
        headers: {
            'Content-Type': 'application/json'
        }
    };

    useEffect(() => {
        const fetchData = () => {
            fetch(`${baseURL}${url}`, requestInit as Partial<RequestInit>)
                .then((response) => response.json())
                .then((data) => setData(data))
                .catch((_) => {
                    // setError({statusCode: '00', statusMessage: 'No pudimos conectarnos con el servidor'})
                    setData({statusCode: '00', statusMessage: 'No pudimos conectarnos con el servidor', items: []})
                })
                .finally(() => setLoading(false));
        }
        fetchData();
    }, [url]);

    return { data, loading };
}