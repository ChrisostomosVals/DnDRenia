import { FC, useEffect } from "react";
import { View, TextInput, Text } from "react-native";
import { loginStyles } from "./Login.style";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "../../components/Button/Button";
import { useDispatch, useSelector } from "react-redux";
import bannerActions from "../../store/banner/actions";
import ConnectApi from "../../dist/api/ConnectApi";
import accountActions from "../../store/account/actions";
import { Tokens } from "../../store/account/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootState } from "../../store/store";

export const Login: FC = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      email: undefined,
      password: undefined,
    },
  });
  const url: string = useSelector((state: RootState) => state.settings.url); 
  const dispatch = useDispatch();
  useEffect(() => {
  }, [url]);
  const onSubmit: SubmitHandler<FormData> = async (data): Promise<void> => {
    let result = await ConnectApi.LoginAsync(data.email!, data.password!, url);
    if (result.isError) {
      dispatch(
        bannerActions.changeText({
          title: "Error",
          paragraph: result.error?.error_description!,
        })
      );
      dispatch(bannerActions.toggle(true));
    } else {
      const storeTokens: Tokens = {
        accessToken: result.data?.access_token!,
        expiresIn: result.data?.expires_in!,
        refreshToken: result.data?.refresh_token!,
        scope: result.data?.scope!,
      };
      dispatch(accountActions.storeTokens(storeTokens));
      dispatch(
        bannerActions.changeText({
          title: "Success",
          paragraph: "Welcome",
        })
      );
      dispatch(bannerActions.toggle(true));
      await AsyncStorage.setItem("accessToken", storeTokens.accessToken!);
    }
  };
  

  
  return (
    <View style={loginStyles.container}>
      <Text style={loginStyles.title.text}>Pathfinder Renia</Text>
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            textContentType="emailAddress"
            onBlur={onBlur}
            onChangeText={onChange}
            placeholderTextColor={loginStyles.textInput.placeholderColor}
            style={loginStyles.textInput.text}
            value={value}
          />
        )}
        name="email"
      />
      <Controller
        control={control}
        rules={{
          required: true,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password"
            textContentType="password"
            onBlur={onBlur}
            onChangeText={onChange}
            secureTextEntry={true}
            style={loginStyles.textInput.text}
            placeholderTextColor={loginStyles.textInput.placeholderColor}
            value={value}
          />
        )}
        name="password"
      />
      <View style={loginStyles.button}>
        <Button.Secondary
          extentedStyles={{
            opacity: !!(errors.email || errors.password) ? 0.5 : 1,
          }}
          disabled={!!(errors.email || errors.password)}
          title="Log In"
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  );
};
type FormData = {
  email: string | undefined;
  password: string | undefined;
};
