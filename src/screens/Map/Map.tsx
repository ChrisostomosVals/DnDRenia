import { FC, useEffect } from "react";
import LocationModel from "../../dist/models/LocationModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import WorldObjectModel from "../../dist/models/WorldObjectModel";
import MapView, {
  LatLng,
  Marker,
  MarkerDragEvent,
  MarkerPressEvent,
  Region,
  UrlTile,
} from "react-native-maps";
import { mapStyles } from "./Map.style";
import {
  CustomCallout,
  CustomCalloutWorld,
} from "../../blocks/CustomCallout/CustomCallout";
import { theme } from "../../theme/theme";
import { Dimensions } from "react-native";
import mapActions from "../../store/map/actions";
import WorldObjectPropModel from "../../dist/models/WorldObjectPropModel";
import modalActions from "../../store/modal/actions";
import { CustomModal } from "../../components/Modal/Modal";

export const Map: FC = () => {
  const locations: LocationModel[] = useSelector(
    (state: RootState) => state.map.locations
  );
  const worldObjects: WorldObjectModel[] = useSelector(
    (state: RootState) => state.map.worldObjects
  );
  const marker: LatLng | undefined = useSelector(
    (state: RootState) => state.map.marker
  );
  const url: string = useSelector((state: RootState) => state.settings.url);
  const type = useSelector((state: RootState) => state.map.type);
  const lastLocation = !!locations.length
    ? locations.reduce((previous, current) => {
        return current.date + current.year > previous.date + previous.year
          ? current
          : previous;
      })
    : null;
  const dispatch = useDispatch();
  const initialRegion: Region = lastLocation
    ? {
        longitude: Number(lastLocation.x),
        latitude: Number(lastLocation.y),
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }
    : {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };
  const { height } = Dimensions.get("window");

  useEffect(() => {}, [url, type, locations, worldObjects]);
  const handleLongPress = (event: MarkerDragEvent): void => {
    const { coordinate, position } = event.nativeEvent;
    dispatch(mapActions.setMarker(coordinate));
  };
const handlePress = (event: MarkerDragEvent): void => {
  dispatch(mapActions.setMarker(undefined));
};
const handleMarkerPress = (event: MarkerPressEvent): void =>{
  if(!type)
    dispatch(modalActions.setLocationVisibility(true));
  else
    dispatch(modalActions.setWorldObjectVisibility(true));
}
  return (
    <>
    <MapView
      style={mapStyles.map.style}
      customMapStyle={mapStyles.map.mapStyle}
      maxZoomLevel={3.9}
      minZoomLevel={0}
      scrollEnabled={true}
      zoomEnabled={true}
      initialRegion={initialRegion}
      onLongPress={handleLongPress}
      onMarkerDrag={handlePress}
      onPress={handlePress}
      legalLabelInsets={mapStyles.map.legalLabelInsets}
      mapType={"none"}
      toolbarEnabled={false}
      provider="google"
    >
      <UrlTile urlTemplate={`${url}/map/{z}/{x}/{y}.png`} zIndex={-1} />
      {!!locations.length &&
        !type &&
        locations.map((location: LocationModel, index: number) => (
          <Marker
            key={location.id}
            coordinate={{
              latitude: Number(location.y),
              longitude: Number(location.x),
            }}
            pinColor={index === 0 ? theme.color.primary.purple : "gold"}
          >
            <CustomCallout {...location} />
          </Marker>
        ))}
      {!!worldObjects.length &&
        type &&
        worldObjects.map((worldObject: WorldObjectModel, index: number) => {
          const latitude: WorldObjectPropModel | undefined =
            worldObject.properties?.find((prop) => prop.name === "latitude");
          const longitude: WorldObjectPropModel | undefined =
            worldObject.properties?.find((prop) => prop.name === "longitude");
          if (longitude && latitude) {
            return (
              <Marker
                key={worldObject.id}
                coordinate={{
                  latitude: Number(latitude.value),
                  longitude: Number(longitude.value),
                }}
                pinColor={theme.color.primary.purple}
              >
                <CustomCalloutWorld {...worldObject} />
              </Marker>
            );
          }
          return null;
        })}
        {marker &&
          <Marker onPress={handleMarkerPress} pinColor={'green'} coordinate={marker}/>
        }    
    </MapView>
        <CustomModal.LocationModal/>
        <CustomModal.WorldObjectModal/>
      </>
  );
};
