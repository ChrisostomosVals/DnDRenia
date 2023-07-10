import { FC, Fragment, useEffect, useState } from "react";
import { ScrollView, Text, TextInput, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { theme } from "../../../theme/theme";
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
import { SpecialAbilitiesFormData } from "./EditSpecialAbilities.type";
import { editSpecialAbilitiesStyles } from "./EditSpecialAbilities.style";

export const EditSpecialAbilities: FC = () => {
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
  } = useForm<SpecialAbilitiesFormData>();
  const dispatch = useDispatch();
  const [addedAbilities, setAddedAbilities] = useState<string[]>([]);
  const [deletedAbilities, setDeletedAbilities] = useState<string[]>([]);
  const handleIncrement = (): void => {
    setAddedAbilities((ability) => [...ability, ""]);
  };
  const handleDecrement = (index: number): void => {
    setAddedAbilities((ability) => ability.filter((_, itemIndex) => itemIndex !== index));
  };
  const handleDeleteAbility = (item: string): void => {
    setDeletedAbilities((ability) => [...ability, item]);
  };
  useEffect(() => {
    setAddedAbilities([]);
    setDeletedAbilities([]);
    reset({ specialAbilities: character?.specialAbilities ?? [] });
  }, [reset, character]);
  const onSubmit: SubmitHandler<SpecialAbilitiesFormData> = async (
    data
  ): Promise<void> => {
    try {
      const updateAbilities: string[] = data.specialAbilities.filter((ability) => {
        return !deletedAbilities.some((deleteFeat) => deleteFeat === ability);
      });
      if (data.addedSpecialAbilities) {
        updateAbilities.push(...data.addedSpecialAbilities);
      }

      const request: UpdateCharacterDefinitionRequestModel<string> = {
        id: character?.id!,
        updateDefinition: updateAbilities,
      };
      const response = await CharacterApi.UpdateSpecialAbilitiesAsync(token, url, request);
      if (response.isError) {
        dispatch(
          bannerActions.changeText({
            title: "Error",
            paragraph: "There was an error updating your Special abilities",
          })
        );
      } else {
        dispatch(
          bannerActions.changeText({
            title: "Success",
            paragraph: "Your Special abilities have been updated",
          })
        );
        dispatch(accountActions.updateSpecialAbilities(updateAbilities));
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
    setAddedAbilities([]);
    setDeletedAbilities([]);
    reset({ specialAbilities: character?.specialAbilities ?? [] });
  };
  return (
    <>
      <ScrollView>
        <Text style={editSpecialAbilitiesStyles.text(theme.fontSize.large)}>Gear</Text>
        {!!character &&
          character.specialAbilities?.map((specialAbility, index: number) => (
            <Fragment key={specialAbility + index}>
              <View
                style={editSpecialAbilitiesStyles.row(
                  deletedAbilities.includes(specialAbility) ? 0.3 : 1
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
                      style={editSpecialAbilitiesStyles.textInput.text}
                      placeholderTextColor={
                        editSpecialAbilitiesStyles.textInput.placeholderColor
                      }
                    />
                  )}
                  name={`specialAbilities.${index}`}
                />
                <MaterialCommunityIcons
                  name="delete"
                  size={20}
                  color={theme.color.primary.error}
                  onPress={() => handleDeleteAbility(specialAbility)}
                />
              </View>
              {(errors?.specialAbilities?.[index] && !deletedAbilities.includes(specialAbility)) && <ErrorField />}
              <LineBreak color={theme.color.primary.lightGray ?? "white"} />
            </Fragment>
          ))}
        <View style={editSpecialAbilitiesStyles.icon}>
          <FontAwesome5Icon
            name="plus-square"
            onPress={handleIncrement}
            color={theme.color.primary.white}
            size={30}
          />
        </View>
        {!!addedAbilities.length &&
          addedAbilities.map((ability, index: number) => (
            <Fragment key={ability + index}>
              <View style={editSpecialAbilitiesStyles.row(1)}>
                <Controller
                  control={control}
                  rules={{
                    required: true,
                  }}
                  render={({ field: { onChange, value } }) => (
                    <TextInput
                      value={value}
                      onChangeText={onChange}
                      style={editSpecialAbilitiesStyles.textInput.text}
                      placeholderTextColor={
                        editSpecialAbilitiesStyles.textInput.placeholderColor
                      }
                    />
                  )}
                  name={`addedSpecialAbilities.${index}`}
                />
                <MaterialCommunityIcons
                  name="delete"
                  size={20}
                  color={theme.color.primary.error}
                  onPress={() => handleDecrement(index)}
                />
              </View>
              {errors?.addedSpecialAbilities?.[index] && <ErrorField />}
              <LineBreak color={theme.color.primary.lightGray ?? "white"} />
            </Fragment>
          ))}
      </ScrollView>
      <View style={editSpecialAbilitiesStyles.buttons}>
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
