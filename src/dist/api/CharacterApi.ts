import ApiResponseModel from "../models/ApiResponseModel";
import ArsenalModel from "../models/ArsenalModel";
import CharacterModel from "../models/CharacterModel";
import CreateCharacterRequestModel from "../models/CreateCharacterRequestModel";
import ErrorResponseModel from "../models/ErrorResponseModel";
import GearModel from "../models/GearModel";
import PropertyModel from "../models/PropertyModel";
import SkillModel from "../models/SkillModel";
import StatModel from "../models/StatModel";
import TransferGearItemRequestModel from "../models/TransferGearItemRequestModel";
import UpdateCharacterArsenalModelRequestModel from "../models/UpdateCharacterArsenalRequestModel";
import UpdateCharacterDefinitionRequestModel from "../models/UpdateCharacterDefinitionRequestModel";
import UpdateCharacterMoneyRequestModel from "../models/UpdateCharacterMoneyRequestModel";
import UpdateCharacterRequestModel from "../models/UpdateCharacterRequestModel";
import { characterEndpoint } from "../utils/constants";
import HttpClient from "../utils/httpService";


export default class CharacterApi{
    public static async GetAsync(token:string, url: string, type: string | null) : Promise<ApiResponseModel<Array<CharacterModel>>> {
        try {
            const uri = type === null ? `${url}/${characterEndpoint}` : `${url}/${characterEndpoint}?type=${type}`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<CharacterModel[]>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<CharacterModel[]>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg = await response.json();
                const error = response.statusText;
                return new ApiResponseModel<CharacterModel[]>(null, ErrorResponseModel.NewErrorMsg(error, errorMsg));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<CharacterModel[]>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<CharacterModel[]>(null, ErrorResponseModel.NewError("CharacterApi.GetAsync().Exception", error));;
        }
    }
    public static async GetByIdAsync(token:string, url: string, id: string) : Promise<ApiResponseModel<CharacterModel>> {
        try {
            const uri = `${url}/${characterEndpoint}/${id}`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<CharacterModel>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<CharacterModel>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg = await response.json();
                const error = response.statusText;
                return new ApiResponseModel<CharacterModel>(null, ErrorResponseModel.NewErrorMsg(error, errorMsg));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<CharacterModel>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<CharacterModel>(null, ErrorResponseModel.NewError("CharacterApi.GetByIdAsync().Exception", error));;
        }
    }
    public static async GetGearAsync(token:string, url: string, id: string) : Promise<ApiResponseModel<GearModel[]>> {
        try {
            const uri = `${url}/${characterEndpoint}/${id}/gear`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<GearModel[]>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<GearModel[]>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg = await response.json();
                const error = response.statusText;
                return new ApiResponseModel<GearModel[]>(null, ErrorResponseModel.NewErrorMsg(error, errorMsg));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<GearModel[]>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<GearModel[]>(null, ErrorResponseModel.NewError("CharacterApi.GetGearAsync().Exception", error));;
        }
    }
    public static async GetGearItemAsync(token:string, url: string, id: string, gearId: string) : Promise<ApiResponseModel<GearModel>> {
        try {
            const uri = `${url}/${characterEndpoint}/${id}/gear/${gearId}`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<GearModel>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<GearModel>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg = await response.json();
                const error = response.statusText;
                return new ApiResponseModel<GearModel>(null, ErrorResponseModel.NewErrorMsg(error, errorMsg));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<GearModel>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<GearModel>(null, ErrorResponseModel.NewError("CharacterApi.GetGearItemAsync().Exception", error));;
        }
    }
    public static async GetMoneyAsync(token:string, url: string, id: string) : Promise<ApiResponseModel<GearModel>> {
        try {
            const uri = `${url}/${characterEndpoint}/${id}/money`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<GearModel>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<GearModel>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg = await response.json();
                const error = response.statusText;
                return new ApiResponseModel<GearModel>(null, ErrorResponseModel.NewErrorMsg(error, errorMsg));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<GearModel>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<GearModel>(null, ErrorResponseModel.NewError("CharacterApi.GetMoneyAsync().Exception", error));;
        }
    }
    public static async GetArsenalAsync(token:string, url: string, id: string) : Promise<ApiResponseModel<ArsenalModel[]>> {
        try {
            const uri = `${url}/${characterEndpoint}/${id}/arsenal`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<ArsenalModel[]>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<ArsenalModel[]>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg = await response.json();
                const error = response.statusText;
                return new ApiResponseModel<ArsenalModel[]>(null, ErrorResponseModel.NewErrorMsg(error, errorMsg));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<ArsenalModel[]>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<ArsenalModel[]>(null, ErrorResponseModel.NewError("CharacterApi.GetArsenalAsync().Exception", error));;
        }
    }
    public static async GetPropertiesAsync(token:string, url: string, id: string) : Promise<ApiResponseModel<PropertyModel[]>> {
        try {
            const uri = `${url}/${characterEndpoint}/${id}/properties`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<PropertyModel[]>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<PropertyModel[]>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg = await response.json();
                const error = response.statusText;
                return new ApiResponseModel<PropertyModel[]>(null, ErrorResponseModel.NewErrorMsg(error, errorMsg));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<PropertyModel[]>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<PropertyModel[]>(null, ErrorResponseModel.NewError("CharacterApi.GetPropertiesAsync().Exception", error));;
        }
    }
    public static async GetSkillsAsync(token:string, url: string, id: string) : Promise<ApiResponseModel<SkillModel[]>> {
        try {
            const uri = `${url}/${characterEndpoint}/${id}/skills`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<SkillModel[]>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<SkillModel[]>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg = await response.json();
                const error = response.statusText;
                return new ApiResponseModel<SkillModel[]>(null, ErrorResponseModel.NewErrorMsg(error, errorMsg));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<SkillModel[]>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<SkillModel[]>(null, ErrorResponseModel.NewError("CharacterApi.GetSkillsAsync().Exception", error));;
        }
    }
    public static async GetFeatsAsync(token:string, url: string, id: string) : Promise<ApiResponseModel<string[]>> {
        try {
            const uri = `${url}/${characterEndpoint}/${id}/feats`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<string[]>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<string[]>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg = await response.json();
                const error = response.statusText;
                return new ApiResponseModel<string[]>(null, ErrorResponseModel.NewErrorMsg(error, errorMsg));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<string[]>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<string[]>(null, ErrorResponseModel.NewError("CharacterApi.GetFeatsAsync().Exception", error));;
        }
    }
    public static async GetSpecialAbilitiesAsync(token:string, url: string, id: string) : Promise<ApiResponseModel<string[]>> {
        try {
            const uri = `${url}/${characterEndpoint}/${id}/specialAbilities`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<string[]>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<string[]>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg = await response.json();
                const error = response.statusText;
                return new ApiResponseModel<string[]>(null, ErrorResponseModel.NewErrorMsg(error, errorMsg));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<string[]>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<string[]>(null, ErrorResponseModel.NewError("CharacterApi.GetSpecialAbilitiesAsync().Exception", error));;
        }
    }
    public static async GetStatsAsync(token:string, url: string, id: string) : Promise<ApiResponseModel<StatModel[]>> {
        try {
            const uri = `${url}/${characterEndpoint}/${id}/stats`;
            const response = await HttpClient.getAsync(token, uri)
            if(response.ok){
                const data = await response.json();
                if(data === null){
                    return new ApiResponseModel<StatModel[]>(data, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<StatModel[]>(data, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg = await response.json();
                const error = response.statusText;
                return new ApiResponseModel<StatModel[]>(null, ErrorResponseModel.NewErrorMsg(error, errorMsg));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<StatModel[]>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<StatModel[]>(null, ErrorResponseModel.NewError("CharacterApi.GetStatsAsync().Exception", error));;
        }
    }
    public static async CreateAsync(token:string, url: string, request: CreateCharacterRequestModel) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${characterEndpoint}`;
            const response = await HttpClient.postAsync(token, uri, request)
            if(response.ok){
                const data = response.statusText;
                if(data === null){
                    return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<void>(null, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg = await response.json();
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, errorMsg));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("CharacterApi.CreateAsync().Exception", error));;
        }
    }
    public static async UpdateAsync(token:string, url: string, request: UpdateCharacterRequestModel) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${characterEndpoint}`;
            const response = await HttpClient.putAsync(token, uri, request)
            if(response.ok){
                const data = response.statusText;
                if(data === null){
                    return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<void>(null, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg = await response.json();
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, errorMsg));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("CharacterApi.UpdateAsync().Exception", error));;
        }
    }
    public static async UpdateGearAsync(token:string, url: string, request: UpdateCharacterDefinitionRequestModel<GearModel>) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${characterEndpoint}/gear`;
            const response = await HttpClient.putAsync(token, uri, request)
            if(response.ok){
                const data = response.statusText;
                if(data === null){
                    return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<void>(null, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg = await response.json();
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, errorMsg));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("CharacterApi.UpdateGearAsync().Exception", error));;
        }
    }
    public static async AddMoneyAsync(token:string, url: string, request: UpdateCharacterMoneyRequestModel) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${characterEndpoint}/gear/money/add`;
            const response = await HttpClient.putAsync(token, uri, request)
            if(response.ok){
                const data = response.statusText;
                if(data === null){
                    return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<void>(null, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg = await response.json();
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, errorMsg));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("CharacterApi.AddMoneyAsync().Exception", error));;
        }
    }
    public static async RemoveMoneyAsync(token:string, url: string, request: UpdateCharacterMoneyRequestModel) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${characterEndpoint}/gear/money/remove`;
            const response = await HttpClient.putAsync(token, uri, request)
            if(response.ok){
                const data = response.statusText;
                if(data === null){
                    return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<void>(null, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg = await response.json();
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, errorMsg));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("CharacterApi.RemoveMoneyAsync().Exception", error));;
        }
    }
    public static async TransferGearAsync(token:string, url: string, request: TransferGearItemRequestModel) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${characterEndpoint}/gear/transfer`;
            const response = await HttpClient.putAsync(token, uri, request)
            if(response.ok){
                const data = response.statusText;
                if(data === null){
                    return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<void>(null, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg = await response.json();
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, errorMsg));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("CharacterApi.TransferGearAsync().Exception", error));;
        }
    }
    public static async EquipItemAsync(token:string, url: string, request: UpdateCharacterArsenalModelRequestModel) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${characterEndpoint}/arsenal/add`;
            const response = await HttpClient.putAsync(token, uri, request)
            if(response.ok){
                const data = response.statusText;
                if(data === null){
                    return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<void>(null, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error, errorMsg.message));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("CharacterApi.EquipItemAsync().Exception", error));;
        }
    }
    public static async UnEquipItemAsync(token:string, url: string, request: UpdateCharacterArsenalModelRequestModel) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${characterEndpoint}/arsenal/remove`;
            const response = await HttpClient.putAsync(token, uri, request)
            if(response.ok){
                const data = response.statusText;
                if(data === null){
                    return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<void>(null, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error, errorMsg.message));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("CharacterApi.UnEquipItemAsync().Exception", error));;
        }
    }
    public static async UpdateSkillsAsync(token:string, url: string, request: UpdateCharacterDefinitionRequestModel<SkillModel>) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${characterEndpoint}/skills`;
            const response = await HttpClient.putAsync(token, uri, request)
            if(response.ok){
                const data = response.statusText;
                if(data === null){
                    return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<void>(null, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error, errorMsg.message));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("CharacterApi.UpdateSkillsAsync().Exception", error));;
        }
    }
    public static async UpdateFeatsAsync(token:string, url: string, request: UpdateCharacterDefinitionRequestModel<string>) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${characterEndpoint}/feats`;
            const response = await HttpClient.putAsync(token, uri, request)
            if(response.ok){
                const data = response.statusText;
                if(data === null){
                    return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<void>(null, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error, errorMsg.message));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("CharacterApi.UpdateFeatsAsync().Exception", error));;
        }
    }
    public static async UpdateSpecialAbilitiesAsync(token:string, url: string, request: UpdateCharacterDefinitionRequestModel<string>) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${characterEndpoint}/specialAbilities`;
            const response = await HttpClient.putAsync(token, uri, request)
            if(response.ok){
                const data = response.statusText;
                if(data === null){
                    return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<void>(null, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error, errorMsg.message));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("CharacterApi.UpdateSpecialAbilitiesAsync().Exception", error));;
        }
    }
    public static async UpdateStatsAsync(token:string, url: string, request: UpdateCharacterDefinitionRequestModel<StatModel>) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${characterEndpoint}/stats`;
            const response = await HttpClient.putAsync(token, uri, request)
            if(response.ok){
                const data = response.statusText;
                if(data === null){
                    return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<void>(null, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error, errorMsg.message));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("CharacterApi.UpdateStatsAsync().Exception", error));;
        }
    }
    public static async UpdatePropertiesAsync(token:string, url: string, request: UpdateCharacterDefinitionRequestModel<PropertyModel>) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${characterEndpoint}/properties`;
            const response = await HttpClient.putAsync(token, uri, request)
            if(response.ok){
                const data = response.statusText;
                if(data === null){
                    return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<void>(null, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error, errorMsg.message));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("CharacterApi.UpdatePropertiesAsync().Exception", error));;
        }
    }
    public static async ChangeVisibilityAsync(token:string, url: string, id: string, visible: boolean) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${characterEndpoint}/${id}/visibility/${visible}`;
            const response = await HttpClient.putAsync(token, uri, null)
            if(response.ok){
                const data = response.statusText;
                if(data === null){
                    return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<void>(null, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error, errorMsg.message));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("CharacterApi.ChangeVisibilityAsync().Exception", error));;
        }
    }
    public static async DeleteAsync(token:string, url: string, id: string) : Promise<ApiResponseModel<void>> {
        try {
            const uri = `${url}/${characterEndpoint}/${id}/delete`;
            const response = await HttpClient.deleteAsync(token, uri)
            if(response.ok){
                const data = response.statusText;
                if(data === null){
                    return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg("content-null", "The response body was empty"));
                }
                return new ApiResponseModel<void>(null, null);
            }
            else if(response.status == 400 || response.status == 404){
                const errorMsg: ErrorResponseModel = await response.json();
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(errorMsg.error, errorMsg.message));
            }
            else if (response.status == 401){
                const error = response.statusText;
                return new ApiResponseModel<void>(null, ErrorResponseModel.NewErrorMsg(error, "Unauthorized access"));
            }
        } catch (error) {
            return new ApiResponseModel<void>(null, ErrorResponseModel.NewError("CharacterApi.DeleteAsync().Exception", error));;
        }
    }
}