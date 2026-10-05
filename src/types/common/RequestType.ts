const Method = {
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE'

} as const;

export interface RequestType {
    url: string;
    method: string | typeof Method;
    body?: any;
}
