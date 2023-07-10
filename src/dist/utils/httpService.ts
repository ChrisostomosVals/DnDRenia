export default class HttpClient{
    static async getAsync(token: string, uri: string){
            const response = await fetch(uri, {
                method: "GET",
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            return response;
    }

    static async postAsync(token: string, uri:string, request:any){
            const response = await fetch(uri, {
                method: "POST",
                body: JSON.stringify(request),
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            return response;
    }

    static async putAsync(token: string, uri:string, request:any | null){
            const response = await fetch(uri, {
                method: "PUT",
                body: JSON.stringify(request),
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            return response;
    }

    static async patchAsync(token: string, uri:string, request:any | null){
            const response = await fetch(uri, {
                method: "PATCH",
                body: JSON.stringify(request),
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            return response;
    }

    static async deleteAsync(token: string, uri:string, request?:any){
            const response = await fetch(uri, {
                method: "DELETE",
                body: JSON.stringify(request),
                headers: {
                    "Authorization": `Bearer ${token}`,
                    "Content-Type": "application/json"
                },
            });
            return response;
    }
}