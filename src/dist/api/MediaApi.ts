import ApiResponseModel from "../models/ApiResponseModel";
import ErrorResponseModel from "../models/ErrorResponseModel";
import UploadMediaRequestModel from "../models/UploadMediaRequestModel";
import { mediaEndpoint } from "../utils/constants";
import HttpClient from "../utils/httpService";

export class MediaApi {
    public static async UploadAsync(token: string, url: string, request: UploadMediaRequestModel): Promise<ApiResponseModel<string[]>> {
        try {
            const uri = `${url}/${mediaEndpoint}/upload`
            const formData = new FormData();
            formData.append("type", request.type)
            formData.append("name", request.name)
            for (const file of request.files) {
                formData.append('Files', file);
            }

            const response = await fetch(uri, {
                method: "POST",
                body: formData,
                headers: {
                    "Authorization": `Bearer ${token}`,
                }
            });
            if (response.ok) {
                const data = await response.json();
                if (data === null) {
                    return new ApiResponseModel<string[]>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<string[]>(data, null);
            }
            else if (response.status == 400 || response.status == 404) {
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<string[]>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));
            }
            throw new Error('Something went wrong');
        } catch (error: any){
            return new ApiResponseModel<string[]>(null, ErrorResponseModel.NewError("MediaApi.UploadAsync().Exception", error));;
        }
    }
    public static async DownloadAsync(token: string, url: string, path: string): Promise<ApiResponseModel<any>> {
        try {
            const uri = `${url}/${mediaEndpoint}/file/${path}`;
            const response = await HttpClient.getAsync(token, uri)
            if (response.ok) {
                const data = await response.blob();
                if (data === null) {
                    return new ApiResponseModel<any>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<any>(data, null);
            }
            else if (response.status == 400 || response.status == 404) {
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<any>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));
            }
            else if (response.status == 401) {
                const error = response.statusText;
                return new ApiResponseModel<any>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }

            throw new Error('Something went wrong');
        } catch (error: any){
            return new ApiResponseModel<any>(null, ErrorResponseModel.NewError("MediaApi.DownloadAsync().Exception", error));;
        }
    }
    public static async GetImageAsync(token: string, url: string, path: string): Promise<ApiResponseModel<any>> {
        try {
            const uri = `${url}/${mediaEndpoint}/image/${path}`;
            const response = await HttpClient.getAsync(token, uri)
            if (response.ok) {
                const data = await response.json();
                if (data === null) {
                    return new ApiResponseModel<any>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<any>(data, null);
            }
            else if (response.status == 400 || response.status == 404) {
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<any>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));
            }
            else if (response.status == 401) {
                const error = response.statusText;
                return new ApiResponseModel<any>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }

            throw new Error('Something went wrong');
        } catch (error: any){
            return new ApiResponseModel<any>(null, ErrorResponseModel.NewError("MediaApi.DownloadAsync().Exception", error));;
        }
    }
    public static async DeleteAsync(token: string, url: string, path: string): Promise<ApiResponseModel<any>> {
        try {
            const uri = `${url}/${mediaEndpoint}/${path}/delete`;
            const response = await HttpClient.deleteAsync(token, uri)
            if (response.ok) {
                const data = await response.json();
                if (data === null) {
                    return new ApiResponseModel<any>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<any>(data, null);
            }
            else if (response.status == 400 || response.status == 404) {
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<any>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));
            }
            else if (response.status == 401) {
                const error = response.statusText;
                return new ApiResponseModel<any>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }

            throw new Error('Something went wrong');
        } catch (error: any){
            return new ApiResponseModel<any>(null, ErrorResponseModel.NewError("MediaApi.DeleteAsync().Exception", error));;
        }
    }
}