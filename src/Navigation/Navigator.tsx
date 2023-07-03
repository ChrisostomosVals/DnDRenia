import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Stats } from "../screens/Stats/Stats";
import { Skills } from "../screens/Skills/Skills";
import { navigatorStyles } from "./Navigator.style";
import { theme } from "../theme/theme";
import { FC, Fragment } from "react";
import CharacterModel from "../dist/models/CharacterModel";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { Gear } from "../screens/Gear/Gear";
import { Feats } from "../screens/Feats/Feats";
import { SpecialAbilities } from "../screens/SpecialAbilities/SpecialAbilities";
import { Settings } from "../screens/Settings/Settings";
import { Ionicons } from "@expo/vector-icons";
import { Login } from "../screens/Login/Login";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Chapters } from "../screens/Chapters/Chapters";
import { Map } from "../screens/Map/Map";
import mapActions from "../store/map/actions";
import { Switch, View } from "react-native";
import modalActions from "../store/modal/actions";
import { World } from "../screens/World/World";
import { ViewType } from "../store/world/types";
import worldActions from "../store/world/actions";

const Drawer = createDrawerNavigator();
export const Navigator: FC = () => {
  const character: CharacterModel | null = useSelector(
    (state: RootState) => state.account.character
  );
  const type = useSelector((state: RootState) => state.map.type);
  const worldView = useSelector((state: RootState) => state.world.view)
  const dispatch = useDispatch();

  const toggleSwitch = (): void => {
    dispatch(mapActions.toggleMarker(!type));
  };
  const handleChapter = (): void => {
    dispatch(modalActions.setChapterVisibility(true));
  }
  const handleWorldView = (view: ViewType): void =>{
    dispatch(worldActions.changeView(view))
  }
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: navigatorStyles.navigator.drawerStyle,
        drawerLabelStyle: navigatorStyles.navigator.drawerLabelStyle,
        drawerActiveTintColor: navigatorStyles.navigator.drawerActiveTintColor,
        drawerInactiveTintColor:
          navigatorStyles.navigator.drawerInactiveTintColor,
      }}
    >
      <Drawer.Screen
        name="MainStats"
        component={Stats}
        options={{
          title: `Stats`,
          headerTitle: `${character?.name}: Stats`,
          headerShown: true,
          headerStyle: navigatorStyles.screen.headerStyle,
          headerTintColor: navigatorStyles.screen.headerTintColor,
          headerTitleStyle: navigatorStyles.screen.headerTitleStyle,
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="stats-chart"
              size={30}
              color={
                focused
                  ? theme.color.primary.purple
                  : theme.color.primary.lightGray
              }
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Skills"
        component={Skills}
        options={{
          title: `Skills`,
          headerTitle: `${character?.name}: Skills`,
          headerShown: true,
          headerStyle: navigatorStyles.screen.headerStyle,
          headerTintColor: navigatorStyles.screen.headerTintColor,
          headerTitleStyle: navigatorStyles.screen.headerTitleStyle,
          drawerIcon: ({ focused, size }) => (
            <MaterialIcon
              name="brain"
              size={30}
              color={
                focused
                  ? theme.color.primary.purple
                  : theme.color.primary.lightGray
              }
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Gear"
        component={Gear}
        options={{
          title: `Gear`,
          headerTitle: `${character?.name}: Gear`,
          headerShown: true,
          headerStyle: navigatorStyles.screen.headerStyle,
          headerTintColor: navigatorStyles.screen.headerTintColor,
          headerTitleStyle: navigatorStyles.screen.headerTitleStyle,
          drawerIcon: ({ focused, size }) => (
            <MaterialIcon
              name="sword-cross"
              size={30}
              color={
                focused
                  ? theme.color.primary.purple
                  : theme.color.primary.lightGray
              }
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Feats"
        component={Feats}
        options={{
          title: `Feats`,
          headerTitle: `${character?.name}: Feats`,
          headerShown: true,
          headerStyle: navigatorStyles.screen.headerStyle,
          headerTintColor: navigatorStyles.screen.headerTintColor,
          headerTitleStyle: navigatorStyles.screen.headerTitleStyle,
          drawerIcon: ({ focused, size }) => (
            <FontAwesome5
              name="medal"
              size={30}
              color={
                focused
                  ? theme.color.primary.purple
                  : theme.color.primary.lightGray
              }
            />
          ),
        }}
      />
      <Drawer.Screen
        name="SpecialAbilities"
        component={SpecialAbilities}
        options={{
          title: `Special Abilities`,
          headerTitle: `${character?.name}: Special Abilities`,
          headerShown: true,
          headerStyle: navigatorStyles.screen.headerStyle,
          headerTintColor: navigatorStyles.screen.headerTintColor,
          headerTitleStyle: navigatorStyles.screen.headerTitleStyle,
          drawerIcon: ({ focused, size }) => (
            <MaterialIcon
              name="run-fast"
              size={30}
              color={
                focused
                  ? theme.color.primary.purple
                  : theme.color.primary.lightGray
              }
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Chapters"
        component={Chapters}
        options={{
          title: `Chapters`,
          headerTitle: `Chapters`,
          headerShown: true,
          headerStyle: navigatorStyles.screen.headerStyle,
          headerTintColor: navigatorStyles.screen.headerTintColor,
          headerTitleStyle: navigatorStyles.screen.headerTitleStyle,
          drawerIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name={focused ? "book-open-page-variant" : "book"}
              size={30}
              color={
                focused
                  ? theme.color.primary.purple
                  : theme.color.primary.lightGray
              }
            />
          ),
          headerRight: () => (
            <View style={navigatorStyles.chapterHeader}>
              <MaterialCommunityIcons
                name="pen-plus"
                color={theme.color.primary.lightGray}
                size={30}
                onPress={handleChapter}
              />
            </View>
          ),
        }}
      />
      <Drawer.Screen
        name="Map"
        component={Map}
        options={{
          title: `Map`,
          headerTitle: `Map`,
          headerShown: true,
          headerStyle: navigatorStyles.screen.headerStyle,
          headerTintColor: navigatorStyles.screen.headerTintColor,
          headerTitleStyle: navigatorStyles.screen.headerTitleStyle,
          headerRight: () => (
            <View style={navigatorStyles.mapHeader}>
              <FontAwesome5
                name="location-arrow"
                color={
                  !type
                    ? theme.color.primary.purple
                    : theme.color.primary.lightGray
                }
                size={30}
              />
              <Switch
                trackColor={{
                  false: theme.color.primary.purple,
                  true: theme.color.primary.lightGray,
                }}
                thumbColor={
                  type
                    ? theme.color.primary.purple
                    : theme.color.primary.lightGray
                }
                ios_backgroundColor={theme.color.primary.purple}
                onValueChange={toggleSwitch}
                style={navigatorStyles.switch}
                value={type}
              />
              <MaterialCommunityIcons
                name="town-hall"
                color={
                  type
                    ? theme.color.primary.purple
                    : theme.color.primary.lightGray
                }
                size={30}
              />
            </View>
          ),
          drawerIcon: ({ focused, size }) => (
            <FontAwesome5
              name="map"
              size={30}
              color={
                focused
                  ? theme.color.primary.purple
                  : theme.color.primary.lightGray
              }
            />
          ),
        }}
      />
      <Drawer.Screen
        name="World"
        component={World}
        options={{
          title: `World`,
          headerTitle: `World`,
          headerShown: true,
          headerStyle: navigatorStyles.screen.headerStyle,
          headerTintColor: navigatorStyles.screen.headerTintColor,
          headerTitleStyle: navigatorStyles.screen.headerTitleStyle,
          drawerIcon: ({ focused, size }) => (
            <FontAwesome5
              name="globe-americas"
              size={30}
              color={
                focused
                  ? theme.color.primary.purple
                  : theme.color.primary.lightGray
              }
            />
          ),
          headerRight: () => (
            <View style={navigatorStyles.worldHeader}>
              <FontAwesome5
                name="location-arrow"
                color={
                  worldView === 'Locations'
                    ? theme.color.primary.purple
                    : theme.color.primary.lightGray
                }
                onPress={() => handleWorldView('Locations')}
                size={30}
              />
              <MaterialCommunityIcons
                name="town-hall"
                color={
                  worldView === 'World-Objects'
                    ? theme.color.primary.purple
                    : theme.color.primary.lightGray
                }
                onPress={() => handleWorldView('World-Objects')}
                size={30}
              />
              <FontAwesome5
                name="users"
                color={
                  worldView === 'Characters'
                    ? theme.color.primary.purple
                    : theme.color.primary.lightGray
                }
                onPress={() => handleWorldView('Characters')}
                size={30}
              />
            </View>
          )
        }}
        
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          title: `Settings`,
          headerTitle: `Settings`,
          headerShown: true,
          headerStyle: navigatorStyles.screen.headerStyle,
          headerTintColor: navigatorStyles.screen.headerTintColor,
          headerTitleStyle: navigatorStyles.screen.headerTitleStyle,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="settings"
              size={30}
              color={
                focused
                  ? theme.color.primary.purple
                  : theme.color.primary.lightGray
              }
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export const LoginNavigator: FC = () => {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: navigatorStyles.navigator.drawerStyle,
        drawerLabelStyle: navigatorStyles.navigator.drawerLabelStyle,
        drawerActiveTintColor: navigatorStyles.navigator.drawerActiveTintColor,
        drawerInactiveTintColor:
          navigatorStyles.navigator.drawerInactiveTintColor,
      }}
    >
      <Drawer.Screen
        name="Login"
        component={Login}
        options={{
          title: `Login`,
          headerTitle: `Login`,
          headerShown: true,
          headerStyle: navigatorStyles.screen.headerStyle,
          headerTintColor: navigatorStyles.screen.headerTintColor,
          headerTitleStyle: navigatorStyles.screen.headerTitleStyle,
          drawerIcon: ({ focused, size }) => (
            <MaterialCommunityIcons
              name="logout"
              size={30}
              color={
                focused
                  ? theme.color.primary.purple
                  : theme.color.primary.lightGray
              }
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Settings}
        options={{
          title: `Settings`,
          headerTitle: `Settings`,
          headerShown: true,
          headerStyle: navigatorStyles.screen.headerStyle,
          headerTintColor: navigatorStyles.screen.headerTintColor,
          headerTitleStyle: navigatorStyles.screen.headerTitleStyle,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="settings"
              size={30}
              color={
                focused
                  ? theme.color.primary.purple
                  : theme.color.primary.lightGray
              }
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};
