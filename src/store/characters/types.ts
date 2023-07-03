import CharacterModel from "../../dist/models/CharacterModel"
import ClassModel from "../../dist/models/ClassModel";
import RaceModel from "../../dist/models/RaceModel";

export type CharactersState = {
    characters: CharacterModel[];
    classes: ClassModel[];
    races: RaceModel[];
    initialized: boolean;
    loading: boolean;
}