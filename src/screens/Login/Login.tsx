import { FC, useEffect } from "react";
import { View, TextInput, Text } from "react-native";
import { loginStyles } from "./Login.style";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { Button } from "../../components/Button/Button";
import { useDispatch } from "react-redux";
import bannerActions from "../../store/banner/actions";
import { ip } from "../../utils/constants";
import ConnectApi from "../../dist/api/ConnectApi";
import LoginErrorModel from "../../dist/models/LoginErrorModel";
import accountActions from "../../store/account/actions";
import { Tokens } from "../../store/account/types";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
  const onSubmit: SubmitHandler<FormData> = async (data): Promise<void> => {
    let result = await ConnectApi.LoginAsync(data.email!, data.password!, ip);
    if (result.isError) {
      console.log(result.error);
      dispatch(
        bannerActions.changeText({
          title: "Error",
          paragraph: result.error?.error_description!,
        })
      );
      dispatch(bannerActions.toggle(true));
    }
    else{
      const storeTokens: Tokens = {
          accessToken: result.data?.access_token!,
          expiresIn: result.data?.expires_in!,
          refreshToken: result.data?.refresh_token!,
          scope: result.data?.scope!
      }
      dispatch(accountActions.storeTokens(storeTokens));
      dispatch(
        bannerActions.changeText({
          title: "Success",
          paragraph: 'Welcome',
        })
      );
      dispatch(bannerActions.toggle(true));
      await AsyncStorage.setItem('accessToken', storeTokens.accessToken!);
    }
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      bannerActions.changeText({
        title: "Error",
        paragraph: "Email and Password are required",
      })
    );
  }, []);
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
          maxLength: 100,
        }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password"
            textContentType="password"
            onBlur={onBlur}
            onChangeText={onChange}
            style={loginStyles.textInput.text}
            placeholderTextColor={loginStyles.textInput.placeholderColor}
            value={value}
          />
        )}
        name="password"
      />
      <View style={loginStyles.button}>
        <Button.Secondary title="Submit" onPress={handleSubmit(onSubmit)} />
      </View>
    </View>
  );
};
type FormData = {
  email: string | undefined;
  password: string | undefined;
};
