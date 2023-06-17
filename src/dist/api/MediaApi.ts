"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MediaApi = void 0;
const ApiResponseModel_1 = __importDefault(require("../models/ApiResponseModel"));
const ErrorResponseModel_1 = __importDefault(require("../models/ErrorResponseModel"));
const constants_1 = require("../utils/constants");
const httpService_1 = __importDefault(require("../utils/httpService"));
class MediaApi {
    static UploadAsync(token, url, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.mediaEndpoint}/upload`;
                const formData = new FormData();
                formData.append("type", request.type);
                formData.append("name", request.name);
                for (const file of request.files) {
                    formData.append('Files', file);
                }
                const response = yield fetch(uri, {
                    method: "POST",
                    body: formData,
                    headers: {
                        "Authorization": `Bearer ${token}`,
                    }
                });
                if (response.ok) {
                    const data = yield response.json();
                    if (data === null) {
                        return new ApiResponseModel_1.default(data, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(data, null);
                }
                else if (response.status == 400 || response.status == 404) {
                    const errorMsg = yield response.json();
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(errorMsg.error, errorMsg.message));
                }
            }
            catch (error) {
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("MediaApi.UploadAsync().Exception", error));
                ;
            }
        });
    }
    static DownloadAsync(token, url, path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.mediaEndpoint}/file/${path}`;
                const response = yield httpService_1.default.getAsync(token, uri);
                if (response.ok) {
                    const data = yield response.blob();
                    if (data === null) {
                        return new ApiResponseModel_1.default(data, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(data, null);
                }
                else if (response.status == 400 || response.status == 404) {
                    const errorMsg = yield response.json();
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(errorMsg.error, errorMsg.message));
                }
                else if (response.status == 401) {
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, "Unauthorized access"));
                }
            }
            catch (error) {
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("MediaApi.DownloadAsync().Exception", error));
                ;
            }
        });
    }
    static DeleteAsync(token, url, path) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.mediaEndpoint}/${path}/delete`;
                const response = yield httpService_1.default.deleteAsync(token, uri);
                if (response.ok) {
                    const data = yield response.json();
                    if (data === null) {
                        return new ApiResponseModel_1.default(data, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(data, null);
                }
                else if (response.status == 400 || response.status == 404) {
                    const errorMsg = yield response.json();
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(errorMsg.error, errorMsg.message));
                }
                else if (response.status == 401) {
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, "Unauthorized access"));
                }
            }
            catch (error) {
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("MediaApi.DeleteAsync().Exception", error));
                ;
            }
        });
    }
}
exports.MediaApi = MediaApi;
//# sourceMappingURL=MediaApi.js.map