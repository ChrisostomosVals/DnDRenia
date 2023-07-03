

import ApiResponseModel from "../models/ApiResponseModel";
import ClassCategoryModel from "../models/ClassCategoryModel";
import ErrorResponseModel from "../models/ErrorResponseModel";
import { classCategoryEndpoint } from "../utils/constants";
import HttpClient from "../utils/httpService";



export default class ClassCategoryApi{
    public static async GetAsync(token:string, url: string) : Promise<ApiResponseModel<Array<ClassCategoryModel>>> {
        try {
            const uri = `${url}/${classCategoryEndpoint}`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<ClassCategoryModel[]>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<ClassCategoryModel[]>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<ClassCategoryModel[]>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<ClassCategoryModel[]>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
            throw new Error('Something went wrong');
        } catch (error: any){
            return new ApiResponseModel<ClassCategoryModel[]>(null, ErrorResponseModel.NewError("ClassCategoryApi.GetAsync().Exception", error));;
        }
    }
    public static async GetByIdAsync(token:string, url: string, id: string) : Promise<ApiResponseModel<ClassCategoryModel>> {
        try {
            const uri = `${url}/${classCategoryEndpoint}/${id}`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<ClassCategoryModel>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<ClassCategoryModel>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<ClassCategoryModel>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<ClassCategoryModel>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
            throw new Error('Something went wrong');
        } catch (error: any){
            return new ApiResponseModel<ClassCategoryModel>(null, ErrorResponseModel.NewError("ClassCategoryApi.GetByIdAsync().Exception", error));;
        }
    }
   
}