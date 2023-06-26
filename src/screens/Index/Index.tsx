import { FC, Fragment, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { appTheme } from "../../theme/themeProvider";
import { NavBar } from "../../blocks/Navigation/NavBar";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import accountActions from "../../store/account/actions";
import { Login } from "../Login/Login";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { indexStyles } from "./Index.style";
import modalActions from "../../store/modal/actions";
import { Button } from "../../components/Button/Button";
import { CustomModal } from "../../components/Modal/Modal";
import { Profile, Tokens } from "../../store/account/types";
import UserApi from "../../dist/api/UserApi";
import { ip } from "../../utils/constants";
import CharacterApi from "../../dist/api/CharacterApi";
import CharacterModel from "../../dist/models/CharacterModel";
import { MainStatType } from "../../store/mainStats/types";
import mainStatActions from "../../store/mainStats/actions";
import { Dimensions } from "react-native";

export const Index: FC = () => {
  const tokens: Tokens | null = useSelector(
    (state: RootState) => state.account.tokens
  );
  const character: CharacterModel | null = useSelector(
    (state: RootState) => state.account.character
  );
  const windowHeight = Dimensions.get('window').height;
  const dispatch = useDispatch();
  useEffect(() => {
    AsyncStorage.getItem("accessToken").then((response) => {
      if (response) {
        dispatch(accountActions.storeAccessToken(response));
        UserApi.GetProfileAsync(tokens?.accessToken!, ip).then((response) => {
          if (!response.isError) {
            const storeProfile: Profile = {
              id: response.data?.id!,
              characterId: response.data?.characterId!,
              email: response.data?.email!,
              name: response.data?.name!,
              role: response.data?.role!,
            };
            dispatch(accountActions.storeProfile(storeProfile));
            CharacterApi.GetByIdAsync(
              tokens?.accessToken!,
              ip,
              response.data?.characterId!
            ).then((response) => {
              if (!response.isError) {
                dispatch(accountActions.setCharacter(response.data!));
              }
            });
          }
        });
        
        const characterMainStats = character?.stats?.filter((stat) =>
          mainStatsNames.includes(stat.name)
        );
        const storeMainStats: MainStatType[] =
          characterMainStats?.map((stat) => {
            const mainStat: MainStatType = {
              name: stat.name,
              value: stat.value,
            };
            return mainStat;
          }) ?? [];
        dispatch(mainStatActions.setStats(storeMainStats));
      }
    });
  }, [tokens?.accessToken]);
  const requestLogout = (): void => {
    dispatch(
      modalActions.setText({
        title: "Are you sure you want to logout?",
        subTitle: null,
      })
    );
    dispatch(modalActions.setVisibility(true));
  };
  const logout = (): void => {
    AsyncStorage.removeItem("accessToken").then((response) => {
      dispatch(accountActions.removeTokens());
      closeModal();
    });
  };
  const closeModal = (): void => {
    dispatch(modalActions.setVisibility(false));
  };
  return (
    <NavigationContainer theme={appTheme}>
      {!tokens?.accessToken ? (
        <Login />
      ) : (
        <Fragment>
          <MaterialCommunityIcons
            name="logout"
            size={30}
            style={indexStyles.icon.container}
            color={indexStyles.icon.color}
            onPress={requestLogout}
          />
          <NavBar />
          <CustomModal
            footer={
              <Fragment>
                <Button.Secondary title="Cancel" onPress={closeModal} />
                <Button.Primary title="Log Out" onPress={logout} />
              </Fragment>
            }
          />
        </Fragment>
      )}
    </NavigationContainer>
  );
};

const mainStatsNames: string[] = [
  "Strength",
  "Dexterity",
  "Constitution",
  "Intelligence",
  "Wisdom",
  "Charisma",
];
