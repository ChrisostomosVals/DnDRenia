

import ApiResponseModel from "../models/ApiResponseModel";
import WorldObjectModel from "../models/WorldObjectModel";
import ErrorResponseModel from "../models/ErrorResponseModel";
import { worldObjectEndpoint } from "../utils/constants";
import HttpClient from "../utils/httpService";
import CreateWorldObjectRequestModel from "../models/CreateWorldObjectRequestModel";
import UpdateWorldObjectRequestModel from "../models/UpdateWorldObjectRequestModel";
import { ImagesUriModel } from "../models/ImagesUriModel";



export default class WorldObjectApi{
    public static async GetAsync(token:string, url: string) : Promise<ApiResponseModel<Array<WorldObjectModel>>> {
        try {
            const uri = `${url}/${worldObjectEndpoint}`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<WorldObjectModel[]>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<WorldObjectModel[]>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<WorldObjectModel[]>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<WorldObjectModel[]>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
            throw new Error('Something went wrong');
        } catch (error: any) {
            return new ApiResponseModel<WorldObjectModel[]>(null, ErrorResponseModel.NewError("WorldObjectApi.GetAsync().Exception", error));;
        }
    }
    public static async GetByIdAsync(token:string, url: string, id: string) : Promise<ApiResponseModel<WorldObjectModel>> {
        try {
            const uri = `${url}/${worldObjectEndpoint}/${id}`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<WorldObjectModel>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<WorldObjectModel>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<WorldObjectModel>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<WorldObjectModel>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
            throw new Error('Something went wrong');
        } catch (error: any) {
            return new ApiResponseModel<WorldObjectModel>(null, ErrorResponseModel.NewError("WorldObjectApi.GetByIdAsync().Exception", error));;
        }
    }
    public static async GetImagesAsync(token:string, url: string, id: string) : Promise<ApiResponseModel<ImagesUriModel>> {
        try {
            const uri = `${url}/${worldObjectEndpoint}/${id}/images`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<ImagesUriModel>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<ImagesUriModel>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<ImagesUriModel>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<ImagesUriModel>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
            throw new Error('Something went wrong');
        } catch (error: any) {
            return new ApiResponseModel<ImagesUriModel>(null, ErrorResponseModel.NewError("WorldObjectApi.GetImagesAsync().Exception", error));;
        }
    }
    public static async CreateAsync(token:string, url: string, request: CreateWorldObjectRequestModel) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${worldObjectEndpoint}`;
            const response = await HttpClient.postAsync(token, uri, request)
            if(response.ok){
                const data = response.statusText
                if(data === null){
                    return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<void>(null, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));;
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
            throw new Error('Something went wrong');
        } catch (error: any) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("WorldObjectApi.CreateAsync().Exception", error));;
        }
    }
    public static async UpdateAsync(token:string, url: string, request: UpdateWorldObjectRequestModel) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${worldObjectEndpoint}`;
            const response = await HttpClient.putAsync(token, uri, request)
            if(response.ok){
                const data = response.statusText;
                if(data === null){
                    return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<void>(null, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
            throw new Error('Something went wrong');
        } catch (error: any) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("WorldObjectApi.UpdateAsync().Exception", error));;
        }
    }
    public static async DeleteAsync(token:string, url: string, id: string) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${worldObjectEndpoint}/${id}/delete`;
            const response = await HttpClient.deleteAsync(token, uri)
            if(response.ok){
                const data = response.statusText;
                if(data === null){
                    return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<void>(null, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
            throw new Error('Something went wrong');
        } catch (error: any) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("WorldObjectApi.DeleteAsync().Exception", error));;
        }
    }
}