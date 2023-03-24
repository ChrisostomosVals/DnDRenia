import ApiResponseModel from "../models/ApiResponseModel";
import UserModel from "../models/UserModel";
import InsertUserRequestModel from "../models/InsertUserRequestModel";
import UpdateUserRequestModel from "../models/UpdateUserRequestModel";
import ChangePasswordRequestModel from "../models/ChangePasswordModel";
export default class UserApi {
    static GetAsync(token: string, url: string): Promise<ApiResponseModel<Array<UserModel>>>;
    static GetByIdAsync(token: string, url: string, id: number): Promise<ApiResponseModel<UserModel>>;
    static GetProfileAsync(token: string, url: string): Promise<ApiResponseModel<UserModel>>;
    static InsertAsync(token: string, url: string, request: InsertUserRequestModel): Promise<ApiResponseModel<void>>;
    static UpdateAsync(token: string, url: string, request: UpdateUserRequestModel): Promise<ApiResponseModel<void>>;
    static ChangePassword(token: string, url: string, id: string, request: ChangePasswordRequestModel): Promise<ApiResponseModel<void>>;
}
