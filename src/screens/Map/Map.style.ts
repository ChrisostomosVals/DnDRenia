import { ImageStyle, StyleProp, TextStyle, ViewStyle } from "react-native";
import { EdgePadding, MapStyleElement } from "react-native-maps"
import { theme } from "../../theme/theme";

type MapStyles = {
    map: {
        mapStyle: MapStyleElement[];
        legalLabelInsets: EdgePadding;
        style: StyleProp<ViewStyle>;
    },
    switchContainer(num: number): StyleProp<ViewStyle>;
    image(width: number, height: number): StyleProp<ImageStyle>;
    bottomSheet: {
        bottomSheetItems: StyleProp<ViewStyle>;
        bottomSheetContainer: StyleProp<ViewStyle>;
        title: StyleProp<TextStyle>;
    }
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
    switchContainer: (num: number) => ({
        position: "absolute",
        right: '40%',
        bottom: num,
        zIndex: 100,
    }),
    image: (width: number, height: number) => ({
        width: width,
        height: height,
        alignSelf: 'center',
        borderRadius: 7
    }),
    bottomSheet: {
        bottomSheetItems: {
            alignSelf: 'center',
            width: '95%',
        },
        bottomSheetContainer: {
            gap: 10,
        },
        title:{
            fontFamily: theme.fontFamily.blackCastle,
            fontSize: theme.fontSize.large,
            textAlign: 'center',
            color: theme.color.primary.white
        }
    }
}