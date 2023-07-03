

import ApiResponseModel from "../models/ApiResponseModel";
import RaceModel from "../models/RaceModel";
import ErrorResponseModel from "../models/ErrorResponseModel";
import { raceEndpoint } from "../utils/constants";
import HttpClient from "../utils/httpService";



export default class RaceApi{
    public static async GetAsync(token:string, url: string) : Promise<ApiResponseModel<Array<RaceModel>>> {
        try {
            const uri = `${url}/${raceEndpoint}`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<RaceModel[]>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<RaceModel[]>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<RaceModel[]>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<RaceModel[]>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
            throw new Error('Something went wrong');
        } catch (error: any){
            return new ApiResponseModel<RaceModel[]>(null, ErrorResponseModel.NewError("RaceApi.GetAsync().Exception", error));;
        }
    }
    public static async GetByIdAsync(token:string, url: string, id: string) : Promise<ApiResponseModel<RaceModel>> {
        try {
            const uri = `${url}/${raceEndpoint}/${id}`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<RaceModel>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<RaceModel>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<RaceModel>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<RaceModel>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
            throw new Error('Something went wrong');
        } catch (error: any){
            return new ApiResponseModel<RaceModel>(null, ErrorResponseModel.NewError("RaceApi.GetByIdAsync().Exception", error));;
        }
    }
    public static async GetByCategoryIdAsync(token:string, url: string, categoryId: string) : Promise<ApiResponseModel<RaceModel[]>> {
        try {
            const uri = `${url}/${raceEndpoint}/${categoryId}/category`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<RaceModel[]>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<RaceModel[]>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<RaceModel[]>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<RaceModel[]>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
            throw new Error('Something went wrong');
        } catch (error: any){
            return new ApiResponseModel<RaceModel[]>(null, ErrorResponseModel.NewError("RaceApi.GetByCategoryIdAsync().Exception", error));;
        }
    }
}