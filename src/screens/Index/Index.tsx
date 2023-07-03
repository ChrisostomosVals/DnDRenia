import { FC, Fragment, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { appTheme } from "../../theme/themeProvider";
import { LoginNavigator, Navigator } from "../../Navigation/Navigator";
import { RootState } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
import AsyncStorage from "@react-native-async-storage/async-storage";
import accountActions from "../../store/account/actions";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { indexStyles } from "./Index.style";
import modalActions from "../../store/modal/actions";
import { Button } from "../../components/Button/Button";
import { CustomModal } from "../../components/Modal/Modal";
import { Profile, Tokens } from "../../store/account/types";
import UserApi from "../../dist/api/UserApi";
import CharacterApi from "../../dist/api/CharacterApi";
import { ActivityIndicator, Dimensions } from "react-native";
import settingsActions from "../../store/settings/actions";
import ChapterApi from "../../dist/api/ChapterApi";
import chaptersActions from "../../store/chapters/actions";
import LocationApi from "../../dist/api/LocationApi";
import mapActions from "../../store/map/actions";
import WorldObjectApi from "../../dist/api/WorldObjectApi";
import worldActions from "../../store/world/actions";
import { theme } from "../../theme/theme";
import charactersActions from "../../store/characters/actions";
import RaceApi from "../../dist/api/RaceApi";
import ClassApi from "../../dist/api/ClassApi";

export const Index: FC = () => {
  const tokens: Tokens | null = useSelector(
    (state: RootState) => state.account.tokens
  );
  const url: string = useSelector((state: RootState) => state.settings.url);
  const account = useSelector((state: RootState) => state.account);
  const { height } = Dimensions.get("window");
  const dispatch = useDispatch();
  useEffect(() => {
    fetchData();
  }, [tokens, url, dispatch]);
  const fetchData = async () => {
    const storedAccessToken = await AsyncStorage.getItem("accessToken");
    if (storedAccessToken) {
      if (url === "") {
        const storedUrl = await AsyncStorage.getItem("url");
        if (!storedUrl) return;
        dispatch(settingsActions.setUrl(storedUrl));
      }
      dispatch(accountActions.storeAccessToken(storedAccessToken));

      const response = await UserApi.GetProfileAsync(storedAccessToken, url);
      if (!response.isError) {
        const storeProfile: Profile = {
          id: response.data?.id!,
          characterId: response.data?.characterId!,
          email: response.data?.email!,
          name: response.data?.name!,
          role: response.data?.role!,
        };
        dispatch(accountActions.storeProfile(storeProfile));

        const characterResponse = await CharacterApi.GetByIdAsync(
          storedAccessToken,
          url,
          response.data?.characterId!
        );
        if (!characterResponse.isError) {
          dispatch(accountActions.setCharacter(characterResponse.data!));
        }
        const chapters = await ChapterApi.GetAsync(storedAccessToken, url);
        if (!chapters.isError) {
          dispatch(chaptersActions.setChapters(chapters.data!));
        }
        const locations = await LocationApi.GetAsync(storedAccessToken, url);
        const worldObjects = await WorldObjectApi.GetAsync(
          storedAccessToken,
          url
        );
        if (!locations.isError && !worldObjects.isError) {
          dispatch(
            mapActions.initializeMap({
              locations: locations.data!,
              worldObjects: worldObjects.data!,
            })
          );
        }
        dispatch(worldActions.initializeState());
        const characters = await CharacterApi.GetAsync(
          storedAccessToken,
          url,
          null
        );
        const classes = await ClassApi.GetAsync(storedAccessToken, url);
        const races = await RaceApi.GetAsync(storedAccessToken, url);
        if (!characters.isError && !classes.isError && !races.isError) {
          dispatch(
            charactersActions.initializeStates({
              characters:
                characters.data?.filter(
                  (char) => char.id !== characterResponse.data?.id
                ) ?? [],
              classes: classes.data ?? [],
              races: races.data ?? [],
            })
          );
        }
      }
    } else {
      setTimeout(fetchData, 1000);
    }
  };

  const requestLogout = (): void => {
    dispatch(
      modalActions.setLogoutText({
        title: "Are you sure you want to logout?",
        subTitle: null,
      })
    );
    dispatch(modalActions.setLogoutVisibility(true));
  };
  const logout = (): void => {
    AsyncStorage.removeItem("accessToken").then((response) => {
      dispatch(accountActions.removeTokens());
      closeModal();
    });
  };
  const closeModal = (): void => {
    dispatch(modalActions.setLogoutVisibility(false));
  };

  return (
    <NavigationContainer theme={appTheme}>
      {!tokens?.accessToken ? (
        <LoginNavigator />
      ) : account.loading ? (
        <ActivityIndicator style={indexStyles.activityIndicator} size={100} />
      ) : (
        <Fragment>
          <MaterialCommunityIcons
            name="logout"
            size={30}
            style={indexStyles.icon.bottom(height - 45)}
            color={indexStyles.icon.color}
            onPress={requestLogout}
          />
          <Navigator />
          <CustomModal.LogoutModal
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
