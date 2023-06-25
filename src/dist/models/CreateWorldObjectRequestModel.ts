import WorldObjectPropModel from "./WorldObjectPropModel";

export default interface CreateWorldObjectRequestModel {
    name: string;
    type: string;
    description: string | null;
    properties: WorldObjectPropModel[] | null;
}