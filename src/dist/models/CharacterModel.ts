import ArsenalModel from "./ArsenalModel";
import GearModel from "./GearModel";
import PropertyModel from "./PropertyModel";
import SkillModel from "./SkillModel";
import StatModel from "./StatModel";

export default interface CharacterModel {
    id: string | null;
    name: string;
    classId: string;
    raceId: string;
    type: string;
    gear: GearModel[] | null;
    arsenal: ArsenalModel[] | null;
    skills: SkillModel[] | null;
    feats: string[] | null;
    specialAbilities: string[] | null;
    stats: StatModel[] | null;
    properties: PropertyModel[] | null;
    visible: boolean;
}