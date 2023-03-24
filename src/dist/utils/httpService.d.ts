export default class HttpClient {
    static getAsync(token: string, uri: string): Promise<Response>;
    static postAsync(token: string, uri: string, request: any): Promise<Response>;
    static putAsync(token: string, uri: string, request: any | null): Promise<Response>;
    static patchAsync(token: string, uri: string, request: any | null): Promise<Response>;
    static deleteAsync(token: string, uri: string): Promise<Response>;
}
