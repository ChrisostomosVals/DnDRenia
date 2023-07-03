import StatModel from "../../dist/models/StatModel";

export type CharacterProps = {
    id: string;
    name: string;
    race: string;
    characterClass: string;
    type: string;
    stats: StatModel[];
}