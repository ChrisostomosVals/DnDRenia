import { useMemo } from "react";
import { View, StyleSheet, TextInput, Image } from "react-native";
import MapView, { UrlTile, Marker, PROVIDER_GOOGLE } from "react-native-maps";
import { useEffect, useState } from "react";
import { globalStyles } from "../utils/styles";
import { Button } from "../components/button";
// @ts-expect-error TS(2306): File 'D:/chris/Coding/Mobile/DnDRenia/DnDRenia/src... Remove this comment to see the full error message
import WorldObjectApi from "../dist/api/WorldObjectApi";
// @ts-expect-error TS(2306): File 'D:/chris/Coding/Mobile/DnDRenia/DnDRenia/src... Remove this comment to see the full error message
import LocationApi from "../dist/api/LocationApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { CustomModal } from "../components/CustomModal";
import { Banner } from "../components/banner";
import { useIsFocused } from "@react-navigation/native";
import { CustomCallout, CustomCallout2 } from "../components/customCallout";
import { CustomModal2 } from "../components/CustomModal2";
import { ip } from "../utils/constants";

export const Map = () => {
  const isFocused = useIsFocused();
  const [markerLocation, setMarkerLocation] = useState(null);
  const [markerTitle, setMarkerTitle] = useState();
  const [objectType, setObjectType] = useState();
  const [description, setDescription] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [markerType, setMarkerType] = useState("Objects");
  const [bannerVisible, setBannerVisible] = useState(false);
  const [markers, setMarkers] = useState([]);
  const [locations, setLocations] = useState([]);
  const [bannerText, setBannerText] = useState({
    title: "",
    paragraph: "",
  });
  const [modalTitle, setModalTitle] = useState("");
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [date, setDate] = useState('')
  const [time, setTime] = useState('')
  const [year, setYear] = useState('')
  const [season, setSeason] = useState('')
  const [event, setEvent] = useState('')
  const [render, setRender] = useState(false)
  useEffect(() => {
    setMarkerLocation(null);
    setSelectedMarker(null);
    fetchObjects();
    fetchLocations();
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
    setMarkerTitle();
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
    setObjectType();
    // @ts-expect-error TS(2554): Expected 1 arguments, but got 0.
    setDescription();
    setModalVisible(false);
    setEditModalVisible(false);
  }, [isFocused, render]);
  const handlePress = (event: any) => {
    const { coordinate } = event.nativeEvent;
    setMarkerLocation(coordinate);
  };

  const fetchLocations = async () => {
    setLocations([]);
    const token = await AsyncStorage.getItem("token");
    const locations = await LocationApi.GetAsync(token, ip, false);
    if (locations.isError) {
      console.log(locations.error, "map.fetchObjects()");
      return;
    }
    const locationsArray = [];
    for (let location of locations.data) {
      locationsArray.push(location);
    }
    // @ts-expect-error TS(2345): Argument of type 'any[]' is not assignable to para... Remove this comment to see the full error message
    setLocations(locationsArray);
  };
  const fetchObjects = async () => {
    setMarkers([]);
    const token = await AsyncStorage.getItem("token");
    const objects = await WorldObjectApi.GetAsync(token, ip);
    if (objects.isError) {
      console.log(objects.error, "map.fetchObjects()");
      return;
    }
    const markersArray = [];
    for (let item of objects.data) {
      const marker = {
        id: item.id,
        title: item.name,
        type: item.type,
        description: item.description,
      };
      if (item.properties !== null) {
        for (let prop of item.properties) {
          if (prop.name === "longitude") {
            // @ts-expect-error TS(2339): Property 'longitude' does not exist on type '{ id:... Remove this comment to see the full error message
            marker.longitude = Number(prop.value);
          } else if (prop.name === "latitude") {
            // @ts-expect-error TS(2339): Property 'latitude' does not exist on type '{ id: ... Remove this comment to see the full error message
            marker.latitude = Number(prop.value);
          }
          // @ts-expect-error TS(2339): Property 'longitude' does not exist on type '{ id:... Remove this comment to see the full error message
          if (marker.longitude === null) marker.longitude = 0;
          // @ts-expect-error TS(2339): Property 'latitude' does not exist on type '{ id: ... Remove this comment to see the full error message
          if (marker.latitude === null) marker.latitude = 0;
        }
        markersArray.push(marker);
      }
    }
    // @ts-expect-error TS(2345): Argument of type '{ id: any; title: any; type: any... Remove this comment to see the full error message
    setMarkers(markersArray);
  };

  const mapStyle = [
    {
      featureType: "administrative",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.icon",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text",
      stylers: [
        {
          visibility: "off",
        },
      ],
    },
  ];
  const handleSave = async () => {
    const token = await AsyncStorage.getItem("token");
    if (markerType === "Objects") {
      const worldObject = {
        name: markerTitle,
        type: objectType,
        description: description,
        properties: [
          {
            name: "latitude",
            // @ts-expect-error TS(2531): Object is possibly 'null'.
            value: markerLocation.latitude.toString(),
          },
          {
            name: "longitude",
            // @ts-expect-error TS(2531): Object is possibly 'null'.
            value: markerLocation.longitude.toString(),
          },
        ],
      };
      const create = await WorldObjectApi.CreateAsync(token, ip, worldObject);
      if (create.isError) {
        console.log(create.error, "map.handleSave()");
        setBannerText({
          title: "Error",
          paragraph: "There was an error creating this object",
        });
        setBannerVisible(true);
        return;
      }
      setBannerText({
        title: "Success",
        paragraph: "Object created",
      });
      setBannerVisible(true);
    } else if (markerType === "Locations") {
      const locationRequest = {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        x: markerLocation.longitude.toString(),
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        y: markerLocation.latitude.toString(),
        date,
        time,
        season,
        year,
        events: event === "" ? [] : [event]
      }
      const createLocation = await LocationApi.CreateAsync(token, ip, locationRequest)
      if(createLocation.isError){
        console.log(createLocation.error, "map.handleSave()");
        setBannerText({
          title: "Error",
          paragraph: "There was an error inserting a new location",
        });
      setBannerVisible(true);
      return;
      }
      setBannerText({
        title: "Success",
        paragraph: "Location Saved",
      });
      setBannerVisible(true);
    }
    setRender(!render);
  };
  const initialRegion = {
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  const modalConfirm = () => {
    setMarkerTitle(markerTitle);
    setModalVisible(false);
  };
  const hideDialog = () => {
    setBannerVisible(false);
  };
  // @ts-expect-error TS(7030): Not all code paths return a value.
  const Children = useMemo(() => {
    if (markerType === "Objects") {
      return (
        <>
          <TextInput
            placeholder="Set Title"
            value={markerTitle}
            style={styles.input}
            // @ts-expect-error TS(2769): No overload matches this call.
            onChangeText={setMarkerTitle}
            placeholderTextColor={"rgba(255,255,255, 0.3)"}
          />
          <TextInput
            placeholder="Set Type"
            value={objectType}
            style={styles.input}
            // @ts-expect-error TS(2769): No overload matches this call.
            onChangeText={setObjectType}
            placeholderTextColor={"rgba(255,255,255, 0.3)"}
          />
          <TextInput
            placeholder="Set Description"
            value={description}
            style={styles.input}
            // @ts-expect-error TS(2769): No overload matches this call.
            onChangeText={setDescription}
            placeholderTextColor={"rgba(255,255,255, 0.3)"}
          />
        </>
      );
    } else if (markerType === "Locations") {
      return (
        <>
          <TextInput
            placeholder="Set Date"
            value={date}
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={setDate}
            placeholderTextColor={"rgba(255,255,255, 0.3)"}
          />
          <TextInput
            placeholder="Set Time"
            value={time}
            style={styles.input}
            onChangeText={setTime}
            placeholderTextColor={"rgba(255,255,255, 0.3)"}
          />
          <TextInput
            placeholder="Set Year"
            value={year}
            keyboardType="number-pad"
            style={styles.input}
            onChangeText={setYear}
            placeholderTextColor={"rgba(255,255,255, 0.3)"}
          />
          <TextInput
            placeholder="Set Season"
            value={season}
            style={styles.input}
            onChangeText={setSeason}
            placeholderTextColor={"rgba(255,255,255, 0.3)"}
          />
           <TextInput
            placeholder="Set Event"
            value={event}
            style={styles.input}
            onChangeText={setEvent}
            placeholderTextColor={"rgba(255,255,255, 0.3)"}
          />
        </>
      );
    }
  }, [date, time, year, season, event, markerTitle, objectType, description, markerType]);

  const editObject = async() =>{
    const token = await AsyncStorage.getItem("token");
    setEditModalVisible(false);
    if(markerType === "Objects"){
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      const findObject = await WorldObjectApi.GetByIdAsync(token, ip, selectedMarker.id);
      if(findObject.isError){
        console.log(findObject.error, 'map.editObject()')
        setBannerText({
          title: "Error",
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          paragraph: `There was an error updating ${selectedMarker.title}`,
        });
      setBannerVisible(true);
        return;
      }
      const object = {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        id: selectedMarker.id,
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        name: selectedMarker.title,
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        description: selectedMarker.description,
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        type: selectedMarker.type,
        properties: findObject.data.properties
      }
      const update = await WorldObjectApi.UpdateAsync(token, ip, object)
      if(update.isError){
        console.log(update.error, 'map.editObject()')
        setBannerText({
          title: "Error",
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          paragraph: `There was an error updating ${selectedMarker.title}`,
        });
      setBannerVisible(true);
      return;
      }
      setBannerText({
        title: "Success",
        paragraph: `Object Saved!`,
      });
    setBannerVisible(true);
    }
    else if(markerType === "Locations"){
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      const findLocation = await LocationApi.GetByIdAsync(token, ip, selectedMarker.id)
      if(findLocation.isError){
        console.log(findLocation.error, 'map.editObject()')
        setBannerText({
          title: "Error",
          paragraph: `There was an error updating location`,
        });
      setBannerVisible(true);
      return;
      }
      const location = {
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        id: selectedMarker.id,
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        x: selectedMarker.x,
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        y: selectedMarker.y,
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        date: selectedMarker.date,
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        time: selectedMarker.time,
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        year: selectedMarker.year,
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        season: selectedMarker.season,
        // @ts-expect-error TS(2531): Object is possibly 'null'.
        events: selectedMarker.events
      }
      const update = await LocationApi.UpdateAsync(token, ip, location)
      if(update.isError){
        console.log(update.error, 'map.editObject()')
        setBannerText({
          title: "Error",
          paragraph: `There was an error updating location`,
        });
      setBannerVisible(true);
      return;
      }
      setBannerText({
        title: "Success",
        paragraph: `Location Saved!`,
      });
    setBannerVisible(true);
    }
    setRender(!render);
  }
  const deleteObject = async() =>{
    const token = await AsyncStorage.getItem("token");
    setEditModalVisible(false);
    if(markerType === "Objects"){
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      const deleteObject = await WorldObjectApi.DeleteAsync(token, ip, selectedMarker.id)
      if(deleteObject.isError){
        console.log(deleteObject.error, 'map.editObject()')
        setBannerText({
          title: "Error",
          // @ts-expect-error TS(2531): Object is possibly 'null'.
          paragraph: `There was an error deleting ${selectedMarker.title}`,
        });
      setBannerVisible(true);
      return;
      }
      setBannerText({
        title: "Success",
        paragraph: `Delete successfully!`,
      });
      setBannerVisible(true);
    }
    else if(markerType === "Locations"){
      // @ts-expect-error TS(2531): Object is possibly 'null'.
      const deleteLocation = await LocationApi.DeleteAsync(token, ip, selectedMarker.id)
      if(deleteLocation.isError){
        console.log(deleteLocation.error, 'map.editObject()')
        setBannerText({
          title: "Error",
          paragraph: `There was an error deleting location`,
        });
      setBannerVisible(true);
      return;
      }
      setBannerText({
        title: "Success",
        paragraph: `Locations deleted successfully!`,
      });
      setBannerVisible(true);
    }
    setRender(!render);
  } 

  // @ts-expect-error TS(7030): Not all code paths return a value.
  const EditChildren = useMemo(() => {
    if(!selectedMarker) return;
    if (markerType === "Objects") {
      return (
        <>
          <TextInput
            placeholder="Set Title"
            // @ts-expect-error TS(2339): Property 'title' does not exist on type 'never'.
            value={selectedMarker.title}
            style={styles.input}
            // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
            onChangeText={(e) => setSelectedMarker(marker => ({...marker, title: e}))}
            placeholderTextColor={"rgba(255,255,255, 0.3)"}
          />
          <TextInput
            placeholder="Set Type"
            // @ts-expect-error TS(2339): Property 'type' does not exist on type 'never'.
            value={selectedMarker.type}
            style={styles.input}
            // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
            onChangeText={(e) => setSelectedMarker(marker => ({...marker, type: e}))}
            placeholderTextColor={"rgba(255,255,255, 0.3)"}
          />
          <TextInput
            placeholder="Set Description"
            // @ts-expect-error TS(2339): Property 'description' does not exist on type 'nev... Remove this comment to see the full error message
            value={selectedMarker.description}
            style={styles.input}
            // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
            onChangeText={(e) => setSelectedMarker(marker => ({...marker, description: e}))}
            placeholderTextColor={"rgba(255,255,255, 0.3)"}
          />
        </>
      );
    } else if (markerType === "Locations") {
      return (
        <>
          <TextInput
            placeholder="Set Date"
            // @ts-expect-error TS(2339): Property 'date' does not exist on type 'never'.
            value={selectedMarker.date.toString()}
            keyboardType="number-pad"
            style={styles.input}
            // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
            onChangeText={(e) => setSelectedMarker(marker => ({...marker, date: Number(e)}))}
            placeholderTextColor={"rgba(255,255,255, 0.3)"}
          />
          <TextInput
            placeholder="Set Time"
            // @ts-expect-error TS(2339): Property 'time' does not exist on type 'never'.
            value={selectedMarker.time}
            style={styles.input}
            // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
            onChangeText={(e) => setSelectedMarker(marker => ({...marker, time: e}))}
            placeholderTextColor={"rgba(255,255,255, 0.3)"}
          />
          <TextInput
            placeholder="Set Year"
            // @ts-expect-error TS(2339): Property 'year' does not exist on type 'never'.
            value={selectedMarker.year.toString()}
            keyboardType="number-pad"
            style={styles.input}
            // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
            onChangeText={(e) => setSelectedMarker(marker => ({...marker, year: Number(e)}))}
            placeholderTextColor={"rgba(255,255,255, 0.3)"}
          />
          <TextInput
            placeholder="Set Season"
            // @ts-expect-error TS(2339): Property 'season' does not exist on type 'never'.
            value={selectedMarker.season}
            style={styles.input}
            // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
            onChangeText={(e) => setSelectedMarker(marker => ({...marker, season: e}))}
            placeholderTextColor={"rgba(255,255,255, 0.3)"}
          />
           <TextInput
            placeholder="Set Event"
            // @ts-expect-error TS(2339): Property 'events' does not exist on type 'never'.
            value={selectedMarker.events[0]}
            style={styles.input}
            // @ts-expect-error TS(2698): Spread types may only be created from object types... Remove this comment to see the full error message
            onChangeText={(e) => setSelectedMarker(marker => ({...marker, events: [e]}))}
            placeholderTextColor={"rgba(255,255,255, 0.3)"}
          />
        </>
      );
    }
  }, [selectedMarker]);

  const toggleMarkerType = () => {
    if (markerType === "Objects") {
      setMarkerType("Locations");
      setModalTitle("New Object");
    } 

    else {
      setMarkerType("Objects");
      setModalTitle("New Location");
    }
  };

  const selectMarker = (marker: any) => {
    setSelectedMarker(marker);
  };
  const handleEdit = () => {
    setEditModalVisible(true);
  };
  const newLocation = () => {
    setModalTitle("New Location");
    setModalVisible(true);
  };
  const handleCancel = () => {
    setMarkerLocation(null);
    setSelectedMarker(null);
  };

  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      // @ts-expect-error TS(2786): 'Button' cannot be used as a JSX component.
      <Button
        disabled={!!selectedMarker}
        opacity={!!selectedMarker ? 0.5 : 1}
        onPress={toggleMarkerType}
        text={markerType}
      />
      <MapView
        style={{ flex: 1, width: "90%", zIndex: -1 }}
        customMapStyle={mapStyle}
        maxZoomLevel={3}
        minZoomLevel={0}
        initialRegion={initialRegion}
        onPress={() => setSelectedMarker(null)}
        onLongPress={handlePress}
        onMarkerDrag={handlePress}
        // @ts-expect-error TS(2739): Type '{ top: number; }' is missing the following p... Remove this comment to see the full error message
        legalLabelInsets={{ top: -500 }}
        mapType={"none"}
        toolbarEnabled={false}
        provider="google"
      >
        <UrlTile
          urlTemplate="https://d8f8-2a02-214a-8329-3700-8071-581f-ca02-e3ea.eu.ngrok.io/gateway/map/{z}/{x}/{y}.png"
          zIndex={-1}
        />
        {markerLocation && !selectedMarker && (
          <>
            <Marker
              coordinate={markerLocation}
              title={markerTitle}
              draggable={true}
              onPress={newLocation}
            />
          </>
        )}
        {markers.length > 0 &&
          markerType === "Objects" &&
          markers.map((marker) => (
            <Marker
              coordinate={{
                // @ts-expect-error TS(2339): Property 'latitude' does not exist on type 'never'... Remove this comment to see the full error message
                latitude: marker.latitude,
                // @ts-expect-error TS(2339): Property 'longitude' does not exist on type 'never... Remove this comment to see the full error message
                longitude: marker.longitude,
              }}
              draggable={
                // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                !!selectedMarker ? marker.id === selectedMarker.id : false
              }
              // @ts-expect-error TS(2339): Property 'title' does not exist on type 'never'.
              title={marker.title}
              // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
              key={marker.id}
              // @ts-expect-error TS(2339): Property 'description' does not exist on type 'nev... Remove this comment to see the full error message
              description={marker.description}
              onPress={() => selectMarker(marker)}
              // @ts-expect-error TS(2322): Type '{ children: Element; coordinate: { latitude:... Remove this comment to see the full error message
              onLongPress={handleEdit}
              // style={{width: 120 , height:120}}
              // image={image[`${marker.type.toLowerCase()}`]}
            >
              // @ts-expect-error TS(2786): 'CustomCallout' cannot be used as a JSX component.
              <CustomCallout
                // @ts-expect-error TS(2339): Property 'title' does not exist on type 'never'.
                title={marker.title}
                // @ts-expect-error TS(2339): Property 'type' does not exist on type 'never'.
                description={marker.type + ': ' + marker.description}
              />
            </Marker>
          ))}
        {locations.length > 0 &&
          markerType === "Locations" &&
          locations.map((location) => (
            <Marker
              coordinate={{
                // @ts-expect-error TS(2339): Property 'y' does not exist on type 'never'.
                latitude: Number(location.y),
                // @ts-expect-error TS(2339): Property 'x' does not exist on type 'never'.
                longitude: Number(location.x),
              }}
              draggable={
                // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
                !!selectedMarker ? location.id === selectedMarker.id : false
              }
              // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
              key={location.id}
              onPress={() => setSelectedMarker(location)}
            >
              // @ts-expect-error TS(2786): 'CustomCallout2' cannot be used as a JSX component... Remove this comment to see the full error message
              <CustomCallout2
                title={{
                  // @ts-expect-error TS(2339): Property 'date' does not exist on type 'never'.
                  date: location.date,
                  // @ts-expect-error TS(2339): Property 'time' does not exist on type 'never'.
                  time: location.time,
                  // @ts-expect-error TS(2339): Property 'year' does not exist on type 'never'.
                  year: location.year,
                  // @ts-expect-error TS(2339): Property 'season' does not exist on type 'never'.
                  season: location.season,
                }}
                // @ts-expect-error TS(2339): Property 'events' does not exist on type 'never'.
                description={location.events}
              />
            </Marker>
          ))}
      </MapView>
      {markerType === "Objects" && (
        selectedMarker ? 
        // @ts-expect-error TS(2786): 'Button' cannot be used as a JSX component.
        <Button
          onPress={handleEdit}
          text="Edit Object"
        /> :
        // @ts-expect-error TS(2786): 'Button' cannot be used as a JSX component.
        <Button
          disabled={!markerLocation}
          opacity={!markerLocation ? 0.5 : 1}
          onPress={handleSave}
          text="Save Object"
        />
      )}
      {markerType === "Locations" && (
        selectedMarker ? 
        // @ts-expect-error TS(2786): 'Button' cannot be used as a JSX component.
        <Button
          onPress={handleEdit}
          text="Edit Location"
        /> :
        // @ts-expect-error TS(2786): 'Button' cannot be used as a JSX component.
        <Button
          disabled={!markerLocation}
          opacity={!markerLocation ? 0.5 : 1}
          onPress={handleSave}
          text="Save Location"
        />
      )}
      // @ts-expect-error TS(2786): 'Button' cannot be used as a JSX component.
      <Button
        disabled={!markerLocation}
        opacity={!markerLocation ? 0.5 : 1}
        onPress={handleCancel}
        text="Cancel"
      />
      <CustomModal
        title={modalTitle}
        modalVisible={modalVisible}
        onClose={() => setModalVisible(false)}
        onConfrim={modalConfirm}
        Children={Children}
      />
       <CustomModal2
        title={`Edit ${markerType.slice(0, -1)}`}
        modalVisible={editModalVisible}
        onClose={deleteObject}
        onConfrim={editObject}
        Children={EditChildren}
        closeTitle="Delete"
        confirmTitle="Save"
        closeModal={() => setEditModalVisible(false)}
      />
      <Banner
        hideDialog={hideDialog}
        visible={bannerVisible}
        text={bannerText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    ...globalStyles.button,
    marginTop: "5%",
  },
  input: {
    fontFamily: "Luminari",
    backgroundColor: "rgba(0,0,0, 0.7)",
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
    margin: 10,
    color: "white",
  },
});

const image = {
  village: require('../assets/images/village-icon.png'),
  city: require('../assets/images/village-icon.png'),
  building: require('../assets/images/village-icon.png'),
  inn: require('../assets/images/hotel-icon.png')
}
