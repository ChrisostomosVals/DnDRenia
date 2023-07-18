import { FC, useEffect, useState } from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import { changeCharacterStyles } from "./ChangeCharacter.styles";
import { Button } from "../../components/Button/Button";
import ErrorField from "../../components/ErrorField/ErrorField";
import UserApi from "../../dist/api/UserApi";
import UpdateUserRequestModel from "../../dist/models/UpdateUserRequestModel";
import bannerActions from "../../store/banner/actions";
import accountActions from "../../store/account/actions";
type CharacterFormData = {
  id: string;
};
export const ChangeCharacter: FC = () => {
  const characters = useSelector(
    (state: RootState) => state.characters.characters
  );
  const character = useSelector((state: RootState) => state.account.character);
  const user = useSelector((state: RootState) => state.account.profile);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CharacterFormData>({});
  const token = useSelector(
    (state: RootState) => state.account.tokens?.accessToken ?? ""
  );
  const url = useSelector((state: RootState) => state.settings.url ?? "");
  const [open, setOpen] = useState<boolean>(false);
  const [types, setTypes] = useState<ItemType<string>[]>([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const characterTypes: ItemType<string>[] = characters.map((ch) => {
      const selector: ItemType<string> = {
        label: ch.name!,
        value: ch.id!,
      };
      return selector;
    });
    setTypes(characterTypes);
    reset({ id: character?.id ?? "" });
  }, [characters]);
  const onSubmit: SubmitHandler<CharacterFormData> = async (
    data
  ): Promise<void> => {
    try {
      const request: UpdateUserRequestModel = {
        id: user?.id!,
        email: user?.email!,
        name: user?.name!,
        characterId: data.id,
      };
      const response = await UserApi.UpdateAsync(token, url, request);
      if (response.isError) {
        dispatch(
          bannerActions.changeText({
            title: "Error",
            paragraph: "There was an error changing character",
          })
        );
      } else {
        dispatch(
          bannerActions.changeText({
            title: "Success",
            paragraph: "Character changed",
          })
        );
        const findCharacter = characters.find((ch) => ch.id === data.id);
        if (findCharacter) {
          dispatch(accountActions.setCharacter(findCharacter));
          dispatch(
            accountActions.storeProfile({ ...user!, characterId: data.id })
          );
        }
      }
      dispatch(bannerActions.toggle(true));
    } catch (ex: any) {
        dispatch(
            bannerActions.changeText({
              title: "Error",
              paragraph: "Something went wrong",
            }))
            dispatch(bannerActions.toggle(true));
    }
  };
  return (
    <View style={changeCharacterStyles.container}>
      <Controller
        control={control}
        rules={{ required: true }}
        render={({ field }) => (
          <View style={changeCharacterStyles.picker.container}>
            <DropDownPicker
              style={changeCharacterStyles.picker.main}
              value={field.value}
              textStyle={changeCharacterStyles.text}
              placeholder="Choose Character"
              items={types}
              scrollViewProps={{
                scrollEnabled: true,
              }}
              modalContentContainerStyle={changeCharacterStyles.picker.modalContentContainerStyle}
              listMode="MODAL"
              showTickIcon={false}
              listItemContainerStyle={changeCharacterStyles.picker.item}
              dropDownContainerStyle={
                changeCharacterStyles.picker.dropDownContainerStyle
              }
              selectedItemContainerStyle={
                changeCharacterStyles.picker.selectedItem
              }
              multiple={false}
              setValue={() => {}}
              onSelectItem={(item) =>
                field.onChange(item.value?.toString() ?? "")
              }
              open={open}
              setOpen={setOpen}
              arrowIconContainerStyle={changeCharacterStyles.picker.arrowIconContainerStyle}
            />
          </View>
        )}
        name="id"
      />
      {errors.id && <ErrorField />}
      <Button.Secondary title="Save" onPress={handleSubmit(onSubmit)} />
    </View>
  );
};
