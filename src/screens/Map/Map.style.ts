import { StyleProp, ViewStyle } from "react-native";
import { EdgePadding, MapStyleElement } from "react-native-maps"

type MapStyles = {
    map: {
        mapStyle: MapStyleElement[];
        legalLabelInsets: EdgePadding;
        style: StyleProp<ViewStyle>;
    },
    switchContainer(num: number): StyleProp<ViewStyle>;
}

export const mapStyles: MapStyles = {
    map: {
        mapStyle:
            [
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
            ],
        legalLabelInsets: {
            top: -500,
            right: 0,
            bottom: 0,
            left: 0
        },
        style: {
            flex: 1, 
            zIndex: -1,
        }
    },
    switchContainer:(num: number) => ({
        position: "absolute", 
            right: '40%', 
            bottom: num, 
            zIndex: 100,
    })
}