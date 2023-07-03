

import ApiResponseModel from "../models/ApiResponseModel";
import UserModel from "../models/UserModel";
import ErrorResponseModel from "../models/ErrorResponseModel";
import { userEndpoint } from "../utils/constants";
import HttpClient from "../utils/httpService";
import InsertUserRequestModel from "../models/InsertUserRequestModel";
import UpdateUserRequestModel from "../models/UpdateUserRequestModel";
import ChangePasswordRequestModel from "../models/ChangePasswordModel";



export default class UserApi{
    public static async GetAsync(token:string, url: string) : Promise<ApiResponseModel<Array<UserModel>>> {
        try {
            const uri = `${url}/${userEndpoint}`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<UserModel[]>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<UserModel[]>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<UserModel[]>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<UserModel[]>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
            throw new Error('Something went wrong');
        } catch (error: any) {
            return new ApiResponseModel<UserModel[]>(null, ErrorResponseModel.NewError("UserApi.GetAsync().Exception", error));;
        }
    }
    public static async GetByIdAsync(token:string, url: string, id: number) : Promise<ApiResponseModel<UserModel>> {
        try {
            const uri = `${url}/${userEndpoint}/${id}`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<UserModel>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<UserModel>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<UserModel>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<UserModel>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
            throw new Error('Something went wrong');
        } catch (error: any) {
            return new ApiResponseModel<UserModel>(null, ErrorResponseModel.NewError("UserApi.GetByIdAsync().Exception", error));;
        }
    }
    public static async GetProfileAsync(token:string, url: string) : Promise<ApiResponseModel<UserModel>> {
        try {
            const uri = `${url}/${userEndpoint}/profile`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<UserModel>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<UserModel>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<UserModel>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error ?? 'Something went wrong', errorMsg.message ?? 'Something went wrong'));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<UserModel>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
            throw new Error('Something went wrong');
        } catch (error: any) {
            return new ApiResponseModel<UserModel>(null, ErrorResponseModel.NewError("UserApi.GetProfileAsync().Exception", error));;
        }
    }
    public static async InsertAsync(token:string, url: string, request: InsertUserRequestModel) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${userEndpoint}`;
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
        } catch (error: any) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("UserApi.InsertAsync().Exception", error));;
        }
    }
    public static async UpdateAsync(token:string, url: string, request: UpdateUserRequestModel) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${userEndpoint}`;
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
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("UserApi.UpdateAsync().Exception", error));;
        }
    }
    public static async ChangePassword(token:string, url: string, id: string, request: ChangePasswordRequestModel) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${userEndpoint}/${id}/changepassword`;
            const response = await HttpClient.patchAsync(token, uri, request)
            if(response.ok){
                const data = response.status;
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
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("UserApi.ChangePassword().Exception", error));;
        }
    }
}