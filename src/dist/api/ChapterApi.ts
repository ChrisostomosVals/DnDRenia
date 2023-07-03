

import ApiResponseModel from "../models/ApiResponseModel";
import ChapterModel from "../models/ChapterModel";
import CreateChapterRequestModel from "../models/CreateChapterRequestModel";
import ErrorResponseModel from "../models/ErrorResponseModel";
import UpdateChapterRequestModel from "../models/UpdateChapterRequestModel";
import { chapterEndpoint } from "../utils/constants";
import HttpClient from "../utils/httpService";



export default class ChapterApi{
    public static async GetAsync(token:string, url: string) : Promise<ApiResponseModel<Array<ChapterModel>>> {
        try {
            const uri = `${url}/${chapterEndpoint}`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<ChapterModel[]>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<ChapterModel[]>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<ChapterModel[]>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<ChapterModel[]>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
            throw new Error('Something went wrong');
        }catch (error: any) {
            return new ApiResponseModel<ChapterModel[]>(null, ErrorResponseModel.NewError("ChapterApi.GetAsync().Exception", error));;
        }
    }
    public static async GetByIdAsync(token:string, url: string, id: string) : Promise<ApiResponseModel<ChapterModel>> {
        try {
            const uri = `${url}/${chapterEndpoint}/${id}`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<ChapterModel>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<ChapterModel>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<ChapterModel>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<ChapterModel>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
            throw new Error('Something went wrong');
        }catch (error: any) {
            return new ApiResponseModel<ChapterModel>(null, ErrorResponseModel.NewError("ChapterApi.GetByIdAsync().Exception", error));;
        }
    }
    public static async CreateAsync(token:string, url: string, request: CreateChapterRequestModel) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${chapterEndpoint}`;
            const response = await HttpClient.postAsync(token, uri, request)
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
        }catch (error: any) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("ChapterApi.CreateAsync().Exception", error));;
        }
    }
    public static async UpdateAsync(token:string, url: string, request: UpdateChapterRequestModel) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${chapterEndpoint}`;
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
        }catch (error: any) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("ChapterApi.UpdateAsync().Exception", error));;
        }
    }
    public static async DeleteAsync(token:string, url: string, id: string) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${chapterEndpoint}/${id}/delete`;
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
        }catch (error: any) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("ChapterApi.DeleteAsync().Exception", error));;
        }
    }
}