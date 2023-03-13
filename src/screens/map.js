import { View } from "react-native";
import MapView, { UrlTile } from 'react-native-maps';


export const Map = () => {
  const image = require('../assets/images/renia.png');
  const imageBounds = [
    [37.78825, -122.4324], // SouthWest coordinates
    [37.79755, -122.41985] // NorthEast coordinates
  ];
  const mapStyle = [
    {
      featureType: 'administrative',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'poi',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'water',
      elementType: 'labels',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.icon',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
    {
      featureType: 'road',
      elementType: 'labels.text',
      stylers: [
        {
          visibility: 'off',
        },
      ],
    },
  ];
  
  const initialRegion = {
    latitude: 37.78825,
    longitude: -122.4324,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
        <MapView
        style={{ flex: 1, width: '90%'}}
        customMapStyle={mapStyle}
        maxZoomLevel={0}
        minZoomLevel={3}
        initialRegion={initialRegion}
      >
        <UrlTile
          urlTemplate="https://a10e-77-49-79-81.eu.ngrok.io/gateway/map/{z}/{x}/{y}.png"
          zIndex={-1}
          />
      </MapView>
    </View>
  );
};
