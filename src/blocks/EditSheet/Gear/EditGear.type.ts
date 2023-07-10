import GearModel from "../../../dist/models/GearModel"

export type EditGearFormData = {
    gear: GearType[];
    addedGear: GearType[];
}

export type GearType = {
    id: string;
    name: string;
    weight: string;
    quantity: string;
}