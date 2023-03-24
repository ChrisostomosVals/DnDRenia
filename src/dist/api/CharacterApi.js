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
const ApiResponseModel_1 = __importDefault(require("../models/ApiResponseModel"));
const ErrorResponseModel_1 = __importDefault(require("../models/ErrorResponseModel"));
const constants_1 = require("../utils/constants");
const httpService_1 = __importDefault(require("../utils/httpService"));
class CharacterApi {
    static GetAsync(token, url, type) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = type === null ? `${url}/${constants_1.characterEndpoint}` : `${url}/${constants_1.characterEndpoint}?type=${type}`;
                const response = yield httpService_1.default.getAsync(token, uri);
                if (response.ok) {
                    const data = yield response.json();
                    if (data === null) {
                        return new ApiResponseModel_1.default(data, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(data, null);
                }
                else if (response.status == 400 || response.status == 404) {
                    const errorMsg = yield response.json();
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, errorMsg));
                }
                else if (response.status == 401) {
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, "Unauthorized access"));
                }
            }
            catch (error) {
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.GetAsync().Exception", error));
                ;
            }
        });
    }
    static GetByIdAsync(token, url, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/${id}`;
                const response = yield httpService_1.default.getAsync(token, uri);
                if (response.ok) {
                    const data = yield response.json();
                    if (data === null) {
                        return new ApiResponseModel_1.default(data, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(data, null);
                }
                else if (response.status == 400 || response.status == 404) {
                    const errorMsg = yield response.json();
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, errorMsg));
                }
                else if (response.status == 401) {
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, "Unauthorized access"));
                }
            }
            catch (error) {
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.GetByIdAsync().Exception", error));
                ;
            }
        });
    }
    static GetGearAsync(token, url, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/${id}/gear`;
                const response = yield httpService_1.default.getAsync(token, uri);
                if (response.ok) {
                    const data = yield response.json();
                    if (data === null) {
                        return new ApiResponseModel_1.default(data, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(data, null);
                }
                else if (response.status == 400 || response.status == 404) {
                    const errorMsg = yield response.json();
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, errorMsg));
                }
                else if (response.status == 401) {
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, "Unauthorized access"));
                }
            }
            catch (error) {
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.GetGearAsync().Exception", error));
                ;
            }
        });
    }
    static GetGearItemAsync(token, url, id, gearId) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/${id}/gear/${gearId}`;
                const response = yield httpService_1.default.getAsync(token, uri);
                if (response.ok) {
                    const data = yield response.json();
                    if (data === null) {
                        return new ApiResponseModel_1.default(data, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(data, null);
                }
                else if (response.status == 400 || response.status == 404) {
                    const errorMsg = yield response.json();
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, errorMsg));
                }
                else if (response.status == 401) {
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, "Unauthorized access"));
                }
            }
            catch (error) {
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.GetGearItemAsync().Exception", error));
                ;
            }
        });
    }
    static GetMoneyAsync(token, url, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/${id}/money`;
                const response = yield httpService_1.default.getAsync(token, uri);
                if (response.ok) {
                    const data = yield response.json();
                    if (data === null) {
                        return new ApiResponseModel_1.default(data, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(data, null);
                }
                else if (response.status == 400 || response.status == 404) {
                    const errorMsg = yield response.json();
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, errorMsg));
                }
                else if (response.status == 401) {
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, "Unauthorized access"));
                }
            }
            catch (error) {
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.GetMoneyAsync().Exception", error));
                ;
            }
        });
    }
    static GetArsenalAsync(token, url, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/${id}/arsenal`;
                const response = yield httpService_1.default.getAsync(token, uri);
                if (response.ok) {
                    const data = yield response.json();
                    if (data === null) {
                        return new ApiResponseModel_1.default(data, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(data, null);
                }
                else if (response.status == 400 || response.status == 404) {
                    const errorMsg = yield response.json();
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, errorMsg));
                }
                else if (response.status == 401) {
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, "Unauthorized access"));
                }
            }
            catch (error) {
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.GetArsenalAsync().Exception", error));
                ;
            }
        });
    }
    static GetPropertiesAsync(token, url, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/${id}/properties`;
                const response = yield httpService_1.default.getAsync(token, uri);
                if (response.ok) {
                    const data = yield response.json();
                    if (data === null) {
                        return new ApiResponseModel_1.default(data, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(data, null);
                }
                else if (response.status == 400 || response.status == 404) {
                    const errorMsg = yield response.json();
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, errorMsg));
                }
                else if (response.status == 401) {
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, "Unauthorized access"));
                }
            }
            catch (error) {
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.GetPropertiesAsync().Exception", error));
                ;
            }
        });
    }
    static GetSkillsAsync(token, url, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/${id}/skills`;
                const response = yield httpService_1.default.getAsync(token, uri);
                if (response.ok) {
                    const data = yield response.json();
                    if (data === null) {
                        return new ApiResponseModel_1.default(data, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(data, null);
                }
                else if (response.status == 400 || response.status == 404) {
                    const errorMsg = yield response.json();
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, errorMsg));
                }
                else if (response.status == 401) {
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, "Unauthorized access"));
                }
            }
            catch (error) {
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.GetSkillsAsync().Exception", error));
                ;
            }
        });
    }
    static GetFeatsAsync(token, url, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/${id}/feats`;
                const response = yield httpService_1.default.getAsync(token, uri);
                if (response.ok) {
                    const data = yield response.json();
                    if (data === null) {
                        return new ApiResponseModel_1.default(data, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(data, null);
                }
                else if (response.status == 400 || response.status == 404) {
                    const errorMsg = yield response.json();
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, errorMsg));
                }
                else if (response.status == 401) {
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, "Unauthorized access"));
                }
            }
            catch (error) {
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.GetFeatsAsync().Exception", error));
                ;
            }
        });
    }
    static GetSpecialAbilitiesAsync(token, url, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/${id}/specialAbilities`;
                const response = yield httpService_1.default.getAsync(token, uri);
                if (response.ok) {
                    const data = yield response.json();
                    if (data === null) {
                        return new ApiResponseModel_1.default(data, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(data, null);
                }
                else if (response.status == 400 || response.status == 404) {
                    const errorMsg = yield response.json();
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, errorMsg));
                }
                else if (response.status == 401) {
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, "Unauthorized access"));
                }
            }
            catch (error) {
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.GetSpecialAbilitiesAsync().Exception", error));
                ;
            }
        });
    }
    static GetStatsAsync(token, url, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/${id}/stats`;
                const response = yield httpService_1.default.getAsync(token, uri);
                if (response.ok) {
                    const data = yield response.json();
                    if (data === null) {
                        return new ApiResponseModel_1.default(data, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(data, null);
                }
                else if (response.status == 400 || response.status == 404) {
                    const errorMsg = yield response.json();
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, errorMsg));
                }
                else if (response.status == 401) {
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, "Unauthorized access"));
                }
            }
            catch (error) {
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.GetStatsAsync().Exception", error));
                ;
            }
        });
    }
    static CreateAsync(token, url, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}`;
                const response = yield httpService_1.default.postAsync(token, uri, request);
                if (response.ok) {
                    const data = response.statusText;
                    if (data === null) {
                        return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(null, null);
                }
                else if (response.status == 400 || response.status == 404) {
                    const errorMsg = yield response.json();
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, errorMsg));
                }
                else if (response.status == 401) {
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, "Unauthorized access"));
                }
            }
            catch (error) {
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.CreateAsync().Exception", error));
                ;
            }
        });
    }
    static UpdateAsync(token, url, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}`;
                const response = yield httpService_1.default.putAsync(token, uri, request);
                if (response.ok) {
                    const data = response.statusText;
                    if (data === null) {
                        return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(null, null);
                }
                else if (response.status == 400 || response.status == 404) {
                    const errorMsg = yield response.json();
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, errorMsg));
                }
                else if (response.status == 401) {
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, "Unauthorized access"));
                }
            }
            catch (error) {
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.UpdateAsync().Exception", error));
                ;
            }
        });
    }
    static UpdateGearAsync(token, url, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/gear`;
                const response = yield httpService_1.default.putAsync(token, uri, request);
                if (response.ok) {
                    const data = response.statusText;
                    if (data === null) {
                        return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(null, null);
                }
                else if (response.status == 400 || response.status == 404) {
                    const errorMsg = yield response.json();
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, errorMsg));
                }
                else if (response.status == 401) {
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, "Unauthorized access"));
                }
            }
            catch (error) {
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.UpdateGearAsync().Exception", error));
                ;
            }
        });
    }
    static AddMoneyAsync(token, url, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/gear/money/add`;
                const response = yield httpService_1.default.putAsync(token, uri, request);
                if (response.ok) {
                    const data = response.statusText;
                    if (data === null) {
                        return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(null, null);
                }
                else if (response.status == 400 || response.status == 404) {
                    const errorMsg = yield response.json();
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, errorMsg));
                }
                else if (response.status == 401) {
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, "Unauthorized access"));
                }
            }
            catch (error) {
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.AddMoneyAsync().Exception", error));
                ;
            }
        });
    }
    static RemoveMoneyAsync(token, url, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/gear/money/remove`;
                const response = yield httpService_1.default.putAsync(token, uri, request);
                if (response.ok) {
                    const data = response.statusText;
                    if (data === null) {
                        return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(null, null);
                }
                else if (response.status == 400 || response.status == 404) {
                    const errorMsg = yield response.json();
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, errorMsg));
                }
                else if (response.status == 401) {
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, "Unauthorized access"));
                }
            }
            catch (error) {
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.RemoveMoneyAsync().Exception", error));
                ;
            }
        });
    }
    static TransferGearAsync(token, url, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/gear/transfer`;
                const response = yield httpService_1.default.putAsync(token, uri, request);
                if (response.ok) {
                    const data = response.statusText;
                    if (data === null) {
                        return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(null, null);
                }
                else if (response.status == 400 || response.status == 404) {
                    const errorMsg = yield response.json();
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, errorMsg));
                }
                else if (response.status == 401) {
                    const error = response.statusText;
                    return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg(error, "Unauthorized access"));
                }
            }
            catch (error) {
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.TransferGearAsync().Exception", error));
                ;
            }
        });
    }
    static EquipItemAsync(token, url, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/arsenal/add`;
                const response = yield httpService_1.default.putAsync(token, uri, request);
                if (response.ok) {
                    const data = response.statusText;
                    if (data === null) {
                        return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(null, null);
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
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.EquipItemAsync().Exception", error));
                ;
            }
        });
    }
    static UnEquipItemAsync(token, url, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/arsenal/remove`;
                const response = yield httpService_1.default.putAsync(token, uri, request);
                if (response.ok) {
                    const data = response.statusText;
                    if (data === null) {
                        return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(null, null);
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
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.UnEquipItemAsync().Exception", error));
                ;
            }
        });
    }
    static UpdateSkillsAsync(token, url, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/skills`;
                const response = yield httpService_1.default.putAsync(token, uri, request);
                if (response.ok) {
                    const data = response.statusText;
                    if (data === null) {
                        return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(null, null);
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
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.UpdateSkillsAsync().Exception", error));
                ;
            }
        });
    }
    static UpdateFeatsAsync(token, url, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/feats`;
                const response = yield httpService_1.default.putAsync(token, uri, request);
                if (response.ok) {
                    const data = response.statusText;
                    if (data === null) {
                        return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(null, null);
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
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.UpdateFeatsAsync().Exception", error));
                ;
            }
        });
    }
    static UpdateSpecialAbilitiesAsync(token, url, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/specialAbilities`;
                const response = yield httpService_1.default.putAsync(token, uri, request);
                if (response.ok) {
                    const data = response.statusText;
                    if (data === null) {
                        return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(null, null);
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
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.UpdateSpecialAbilitiesAsync().Exception", error));
                ;
            }
        });
    }
    static UpdateStatsAsync(token, url, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/stats`;
                const response = yield httpService_1.default.putAsync(token, uri, request);
                if (response.ok) {
                    const data = response.statusText;
                    if (data === null) {
                        return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(null, null);
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
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.UpdateStatsAsync().Exception", error));
                ;
            }
        });
    }
    static UpdatePropertiesAsync(token, url, request) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/properties`;
                const response = yield httpService_1.default.putAsync(token, uri, request);
                if (response.ok) {
                    const data = response.statusText;
                    if (data === null) {
                        return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(null, null);
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
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.UpdatePropertiesAsync().Exception", error));
                ;
            }
        });
    }
    static ChangeVisibilityAsync(token, url, id, visible) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/${id}/visibility/${visible}`;
                const response = yield httpService_1.default.putAsync(token, uri, null);
                if (response.ok) {
                    const data = response.statusText;
                    if (data === null) {
                        return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(null, null);
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
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.ChangeVisibilityAsync().Exception", error));
                ;
            }
        });
    }
    static DeleteAsync(token, url, id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const uri = `${url}/${constants_1.characterEndpoint}/${id}/delete`;
                const response = yield httpService_1.default.deleteAsync(token, uri);
                if (response.ok) {
                    const data = response.statusText;
                    if (data === null) {
                        return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewErrorMsg("content-null", "The response body was empty"));
                    }
                    return new ApiResponseModel_1.default(null, null);
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
                return new ApiResponseModel_1.default(null, ErrorResponseModel_1.default.NewError("CharacterApi.DeleteAsync().Exception", error));
                ;
            }
        });
    }
}
exports.default = CharacterApi;
//# sourceMappingURL=CharacterApi.js.map