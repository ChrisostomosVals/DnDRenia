import ApiResponseModel from "../models/ApiResponseModel";
import LocationModel from "../models/LocationModel";
import InsertLocationRequestModel from "../models/InsertLocationRequestModel";
import UpdateLocationRequestModel from "../models/UpdateLocationRequestModel";
export default class LocationApi {
    static GetAsync(token: string, url: string): Promise<ApiResponseModel<LocationModel[]>>;
    static GetLatestAsync(token: string, url: string): Promise<ApiResponseModel<LocationModel>>;
    static GetByIdAsync(token: string, url: string, id: number): Promise<ApiResponseModel<LocationModel>>;
    static CreateAsync(token: string, url: string, request: InsertLocationRequestModel): Promise<ApiResponseModel<void>>;
    static UpdateAsync(token: string, url: string, request: UpdateLocationRequestModel): Promise<ApiResponseModel<void>>;
    static DeleteAsync(token: string, url: string, id: string): Promise<ApiResponseModel<void>>;
}
