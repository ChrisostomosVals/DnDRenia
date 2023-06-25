import ArsenalModel from "./ArsenalModel";
import GearModel from "./GearModel";
import PropertyModel from "./PropertyModel";
import SkillModel from "./SkillModel";
import StatModel from "./StatModel";

export default interface CreateCharacterRequestModel {
    name: string;
    type: string;
    classId: string;
    raceId: string;
    visible: boolean;
}