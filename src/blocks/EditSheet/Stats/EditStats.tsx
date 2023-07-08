import { FC, Fragment, useEffect } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { Button } from "../../../components/Button/Button";
import { LineBreak } from "../../../components/LineBreak/LineBreak";
import { theme } from "../../../theme/theme";
import { editStatsStyles } from "./EditStats.style";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ErrorField from "../../../components/ErrorField/ErrorField";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { StatsFormData } from "./EditStats.type";
import UpdateCharacterDefinitionRequestModel from "../../../dist/models/UpdateCharacterDefinitionRequestModel";
import StatModel from "../../../dist/models/StatModel";
import bannerActions from "../../../store/banner/actions";
import CharacterApi from "../../../dist/api/CharacterApi";
import accountActions from "../../../store/account/actions";

export const EditStats: FC = () => {
  const character = useSelector((state: RootState) => state.account.character);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<StatsFormData>();
  const token = useSelector(
    (state: RootState) => state.account.tokens?.accessToken ?? ""
  );
  const url = useSelector((state: RootState) => state.settings.url);
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<StatsFormData> = async (
    data
  ): Promise<void> => {
    try {
      const request: UpdateCharacterDefinitionRequestModel<StatModel> = {
        id: character?.id!,
        updateDefinition: data.stats,
      };
      const response = await CharacterApi.UpdateStatsAsync(token, url, request);
      if (response.isError) {
        dispatch(
          bannerActions.changeText({
            title: "Error",
            paragraph: "There was an error updating your stats",
          })
        );
      } else {
        dispatch(
          bannerActions.changeText({
            title: "Success",
            paragraph: "Your Stats have been updated",
          })
        );
        dispatch(accountActions.updateStats(data.stats));
      }
      dispatch(bannerActions.toggle(true));
    } catch (ex: any) {
      dispatch(
        bannerActions.changeText({
          title: "Error",
          paragraph: "Something went wrong",
        })
      );
      dispatch(bannerActions.toggle(true));
    }
  };
  useEffect(() => {
    reset({ stats: character?.stats! });
  }, [character, reset]);
  return (
    <>
      <ScrollView contentContainerStyle={{ position: "relative" }}>
        {!!character && (
          <>
              <Text style={editStatsStyles.text(theme.fontSize.large)}>
                Stats
              </Text>
              {character.stats?.map((stat, index) => (
                <Fragment key={stat.name + index}>
                  <View style={editStatsStyles.row}>
                    <Text
                      style={editStatsStyles.text(theme.fontSize.medium)}
                    >
                      {stat.name}:
                    </Text>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          style={editStatsStyles.textInput.text}
                          placeholderTextColor={
                            editStatsStyles.textInput.placeholderColor
                          }
                        />
                      )}
                      name={`stats.${index}.value`}
                    />
                  </View>
                  {errors?.stats?.[index]?.value && <ErrorField />}
                  <LineBreak color={theme.color.primary.lightGray ?? "white"} />
                </Fragment>
              ))}
          </>
        )}
      </ScrollView>
      <View style={editStatsStyles.button}>
        <Button.Secondary title="Save" onPress={handleSubmit(onSubmit)} />
      </View>
    </>
  );
};
