import ApiResponseModel from "../models/ApiResponseModel";
import ChapterModel from "../models/ChapterModel";
import CreateChapterRequestModel from "../models/CreateChapterRequestModel";
import UpdateChapterRequestModel from "../models/UpdateChapterRequestModel";
export default class ChapterApi {
    static GetAsync(token: string, url: string): Promise<ApiResponseModel<Array<ChapterModel>>>;
    static GetByIdAsync(token: string, url: string, id: string): Promise<ApiResponseModel<ChapterModel>>;
    static CreateAsync(token: string, url: string, request: CreateChapterRequestModel): Promise<ApiResponseModel<void>>;
    static UpdateAsync(token: string, url: string, request: UpdateChapterRequestModel): Promise<ApiResponseModel<void>>;
    static DeleteAsync(token: string, url: string, id: string): Promise<ApiResponseModel<void>>;
}
