import ApiResponseModel from "../models/ApiResponseModel";
import ClassCategoryModel from "../models/ClassCategoryModel";
export default class ClassCategoryApi {
    static GetAsync(token: string, url: string): Promise<ApiResponseModel<Array<ClassCategoryModel>>>;
    static GetByIdAsync(token: string, url: string, id: string): Promise<ApiResponseModel<ClassCategoryModel>>;
}
