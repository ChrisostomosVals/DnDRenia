import ApiResponseModel from "../models/ApiResponseModel";
import TokenModel from "../models/TokenModel";
export default class ConnectApi {
    static LoginAsync(email: string, password: string, url: string): Promise<ApiResponseModel<TokenModel>>;
    static UserInfo(token: string, url: string): Promise<ApiResponseModel<any>>;
}
