import ApiResponseModel from "../models/ApiResponseModel";
import WorldObjectModel from "../models/WorldObjectModel";
import CreateWorldObjectRequestModel from "../models/CreateWorldObjectRequestModel";
import UpdateWorldObjectRequestModel from "../models/UpdateWorldObjectRequestModel";
export default class WorldObjectApi {
    static GetAsync(token: string, url: string): Promise<ApiResponseModel<Array<WorldObjectModel>>>;
    static GetByIdAsync(token: string, url: string, id: string): Promise<ApiResponseModel<WorldObjectModel>>;
    static CreateAsync(token: string, url: string, request: CreateWorldObjectRequestModel): Promise<ApiResponseModel<void>>;
    static UpdateAsync(token: string, url: string, request: UpdateWorldObjectRequestModel): Promise<ApiResponseModel<void>>;
    static DeleteAsync(token: string, url: string, id: string): Promise<ApiResponseModel<void>>;
}
