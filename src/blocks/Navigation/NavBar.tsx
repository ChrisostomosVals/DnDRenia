import { createDrawerNavigator } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialIcon from "react-native-vector-icons/MaterialCommunityIcons";
import { MainStats } from "../../screens/MainStats/MainStats";
import { Skills } from "../../screens/Skills/Skills";
import { navBarStyles } from "./NavBar.style";
import { theme } from "../../theme/theme";
import { FC } from "react";

const Drawer = createDrawerNavigator();
export const NavBar: FC = () => {
  
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerStyle: navBarStyles.navigator.drawerStyle,
        drawerLabelStyle: navBarStyles.navigator.drawerLabelStyle,
        drawerActiveTintColor: navBarStyles.navigator.drawerActiveTintColor,
        drawerInactiveTintColor: navBarStyles.navigator.drawerInactiveTintColor,
      }}
    >
      <Drawer.Screen
        name="MainStats"
        component={MainStats}
        options={{
          title: "Main Stats",
          headerShown: true,
          headerStyle: navBarStyles.screen.headerStyle,
          headerTintColor: navBarStyles.screen.headerTintColor,
          headerTitleStyle: navBarStyles.screen.headerTitleStyle,
          drawerIcon: ({ focused, size }) => (
            <Icon
              name="stats-chart"
              size={20}
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
          title: "Skills",
          headerShown: true,
          headerStyle: navBarStyles.screen.headerStyle,
          headerTintColor: navBarStyles.screen.headerTintColor,
          headerTitleStyle: navBarStyles.screen.headerTitleStyle,
          drawerIcon: ({ focused, size }) => (
            <MaterialIcon
              name="brain"
              size={20}
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
