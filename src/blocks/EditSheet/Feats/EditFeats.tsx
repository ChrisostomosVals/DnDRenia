import { FC, Fragment, useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { theme } from "../../../theme/theme";
import { editFeatsStyles } from "./EditFeats.style";
import { FeatsFormData } from "./EditFeats.type";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Button } from "../../../components/Button/Button";
import bannerActions from "../../../store/banner/actions";
import accountActions from "../../../store/account/actions";
import CharacterApi from "../../../dist/api/CharacterApi";
import UpdateCharacterDefinitionRequestModel from "../../../dist/models/UpdateCharacterDefinitionRequestModel";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import { LineBreak } from "../../../components/LineBreak/LineBreak";
import ErrorField from "../../../components/ErrorField/ErrorField";

export const EditFeats: FC = () => {
  const token = useSelector(
    (state: RootState) => state.account.tokens?.accessToken ?? ""
  );
  const character = useSelector((state: RootState) => state.account.character);
  const url = useSelector((state: RootState) => state.settings.url);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FeatsFormData>();
  const dispatch = useDispatch();
  const [addedFeats, setAddedFeats] = useState<string[]>([]);
  const [deletedFeats, setDeletedFeats] = useState<string[]>([]);
  const handleIncrement = (): void => {
    setAddedFeats((feat) => [...feat, ""]);
  };
  const handleDecrement = (index: number): void => {
    setAddedFeats((gear) => gear.filter((_, itemIndex) => itemIndex !== index));
  };
  const handleDeleteFeat = (item: string): void => {
    setDeletedFeats((feat) => [...feat, item]);
  };
  useEffect(() => {
    setAddedFeats([]);
    setDeletedFeats([]);
    reset({ feats: character?.feats ?? [] });
  }, [reset, character]);
  const onSubmit: SubmitHandler<FeatsFormData> = async (
    data
  ): Promise<void> => {
    try {
      const updateFeats: string[] = data.feats.filter((feat) => {
        return !deletedFeats.some((deleteFeat) => deleteFeat === feat);
      });
      if (data.addedFeats) {
        updateFeats.push(...data.addedFeats);
      }

      const request: UpdateCharacterDefinitionRequestModel<string> = {
        id: character?.id!,
        updateDefinition: updateFeats,
      };
      const response = await CharacterApi.UpdateFeatsAsync(token, url, request);
      if (response.isError) {
        dispatch(
          bannerActions.changeText({
            title: "Error",
            paragraph: "There was an error updating your Feats",
          })
        );
      } else {
        dispatch(
          bannerActions.changeText({
            title: "Success",
            paragraph: "Your Feats have been updated",
          })
        );
        dispatch(accountActions.updateFeats(updateFeats));
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
  const handleCancel = (): void => {
    setAddedFeats([]);
    setDeletedFeats([]);
    reset({ feats: character?.feats ?? [] });
  };
  return (
    <>
      <ScrollView>
        <Text style={editFeatsStyles.text(theme.fontSize.large)}>Feats</Text>
        {!!character &&
          character.feats?.map((feat, index: number) => (
            <Fragment key={feat + index}>
              <View
                style={editFeatsStyles.row(
                  deletedFeats.includes(feat) ? 0.3 : 1
                )}
              >
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      style={editFeatsStyles.textInput.text}
                      placeholderTextColor={
                        editFeatsStyles.textInput.placeholderColor
                      }
                    />
                  )}
                  name={`feats.${index}`}
                />
                <MaterialCommunityIcons
                  name="delete"
                  size={20}
                  color={theme.color.primary.error}
                  onPress={() => handleDeleteFeat(feat)}
                />
              </View>
              {(errors?.feats?.[index] && !deletedFeats.includes(feat)) && <ErrorField />}
              <LineBreak color={theme.color.primary.lightGray ?? "white"} />
            </Fragment>
          ))}
        <View style={editFeatsStyles.icon}>
          <FontAwesome5Icon
            name="plus-square"
            onPress={handleIncrement}
            color={theme.color.primary.white}
            size={30}
          />
        </View>
        {!!addedFeats.length &&
          addedFeats.map((feat, index: number) => (
            <Fragment key={feat + index}>
              <View style={editFeatsStyles.row(1)}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      style={editFeatsStyles.textInput.text}
                      placeholderTextColor={
                        editFeatsStyles.textInput.placeholderColor
                      }
                    />
                  )}
                  name={`addedFeats.${index}`}
                />
                <MaterialCommunityIcons
                  name="delete"
                  size={20}
                  color={theme.color.primary.error}
                  onPress={() => handleDecrement(index)}
                />
              </View>
              {errors?.addedFeats?.[index] && <ErrorField />}
              <LineBreak color={theme.color.primary.lightGray ?? "white"} />
            </Fragment>
          ))}
      </ScrollView>
      <View style={editFeatsStyles.buttons}>
        <Button.Primary
          extentedStyles={{ backgroundColor: theme.color.primary.darkPurple }}
          title="Cancel"
          onPress={handleCancel}
        />
        <Button.Secondary title="Save" onPress={handleSubmit(onSubmit)} />
      </View>
    </>
  );
};
