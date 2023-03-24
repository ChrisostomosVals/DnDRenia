import ApiResponseModel from "../models/ApiResponseModel";
import RaceCategoryModel from "../models/RaceCategoryModel";
export default class RaceCategoryApi {
    static GetAsync(token: string, url: string): Promise<ApiResponseModel<Array<RaceCategoryModel>>>;
    static GetByIdAsync(token: string, url: string, id: string): Promise<ApiResponseModel<RaceCategoryModel>>;
}
