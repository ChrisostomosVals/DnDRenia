import ApiResponseModel from "../models/ApiResponseModel";
import UploadMediaRequestModel from "../models/UploadMediaRequestModel";
export declare class MediaApi {
    static UploadAsync(token: string, url: string, request: UploadMediaRequestModel): Promise<ApiResponseModel<string[]>>;
    static DownloadAsync(token: string, url: string, path: string): Promise<ApiResponseModel<any>>;
    static DeleteAsync(token: string, url: string, path: string): Promise<ApiResponseModel<any>>;
}
