import { LatLng } from "react-native-maps";
import LocationModel from "../../dist/models/LocationModel"
import WorldObjectModel from "../../dist/models/WorldObjectModel";

export type MapState = {
    locations: LocationModel[];
    worldObjects: WorldObjectModel[];
    type: boolean;
    marker?: LatLng;
    loading: boolean;
    initialised: boolean;
}