import { FC, useEffect } from "react";
import { View, TextInput, Text } from "react-native";
import { settingsStyles } from "./Settings.style";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import bannerActions from "../../store/banner/actions";
import { ip } from "../../utils/constants";
import ConnectApi from "../../dist/api/ConnectApi";
import accountActions from "../../store/account/actions";
import { Tokens } from "../../store/account/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import settingsActions from "../../store/settings/actions";
import { RootState } from "../../store/store";

export const Settings: FC = () => {
    const url = useSelector((state: RootState) => state.settings.url)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      url: url
    },
  });
  
  const dispatch = useDispatch();
  useEffect(() => {
    
  }, []);
  const onSubmit: SubmitHandler<FormData> = async (data): Promise<void> => {
    dispatch(
      bannerActions.changeText({
        title: "Success",
        paragraph: "URL updated",
      })
    );
    await AsyncStorage.setItem('url', data.url);
    dispatch(settingsActions.setUrl(data.url));
    dispatch(bannerActions.toggle(true));
  };
  

  
  return (
    <View style={settingsStyles.container}>
      <Text style={settingsStyles.title.text}>Settings</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="URL"
            onBlur={onBlur}
            onChangeText={onChange}
            placeholderTextColor={settingsStyles.textInput.placeholderColor}
            style={settingsStyles.textInput.text}
            value={value}
          />
        )}
        name="url"
      />
      <View style={settingsStyles.button}>
        <Button.Secondary
          title="Save"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};
type FormData = {
  url: string;
};
