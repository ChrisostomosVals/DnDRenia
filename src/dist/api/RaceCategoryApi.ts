

import ApiResponseModel from "../models/ApiResponseModel";
import RaceCategoryModel from "../models/RaceCategoryModel";
import ErrorResponseModel from "../models/ErrorResponseModel";
import { raceCategoryEndpoint } from "../utils/constants";
import HttpClient from "../utils/httpService";



export default class RaceCategoryApi{
    public static async GetAsync(token:string, url: string) : Promise<ApiResponseModel<Array<RaceCategoryModel>>> {
        try {
            const uri = `${url}/${raceCategoryEndpoint}`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<RaceCategoryModel[]>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<RaceCategoryModel[]>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<RaceCategoryModel[]>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<RaceCategoryModel[]>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
            throw new Error('Something went wrong');
        } catch (error: any) {
            return new ApiResponseModel<RaceCategoryModel[]>(null, ErrorResponseModel.NewError("RaceCategoryApi.GetAsync().Exception", error));;
        }
    }
    public static async GetByIdAsync(token:string, url: string, id: string) : Promise<ApiResponseModel<RaceCategoryModel>> {
        try {
            const uri = `${url}/${raceCategoryEndpoint}/${id}`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<RaceCategoryModel>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<RaceCategoryModel>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<RaceCategoryModel>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<RaceCategoryModel>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
            throw new Error('Something went wrong');
        } catch (error: any) {
            return new ApiResponseModel<RaceCategoryModel>(null, ErrorResponseModel.NewError("RaceCategoryApi.GetByIdAsync().Exception", error));;
        }
    }
   
}