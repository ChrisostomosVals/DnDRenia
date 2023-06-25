import WorldObjectPropModel from "./WorldObjectPropModel";

export default interface WorldObjectModel {
    id: string;
    name: string;
    type: string;
    description: string | null;
    properties: WorldObjectPropModel[] | null;
}