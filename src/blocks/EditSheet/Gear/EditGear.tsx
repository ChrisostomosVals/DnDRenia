import { FC, Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { ScrollView, Text, TextInput, View } from "react-native";
import { editGearStyles } from "./EditGear.style";
import { theme } from "../../../theme/theme";
import { EditGearFormData, GearType } from "./EditGear.type";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import ErrorField from "../../../components/ErrorField/ErrorField";
import { LineBreak } from "../../../components/LineBreak/LineBreak";
import GearModel from "../../../dist/models/GearModel";
import { Button } from "../../../components/Button/Button";
import FontAwesome5Icon from "react-native-vector-icons/FontAwesome5";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import CharacterApi from "../../../dist/api/CharacterApi";
import bannerActions from "../../../store/banner/actions";
import UpdateCharacterDefinitionRequestModel from "../../../dist/models/UpdateCharacterDefinitionRequestModel";
import accountActions from "../../../store/account/actions";

export const EditGear: FC = () => {
  const token = useSelector(
    (state: RootState) => state.account.tokens?.accessToken ?? ""
  );
  const character = useSelector((state: RootState) => state.account.character);
  const gear: GearType[] = character?.gear?.map(item => {
    const mapItem: GearType ={
      id: item.id!,
      name: item.name,
      quantity: item.quantity.toString(),
      weight: item.weight ?? '-'
    }
    return mapItem
  }) ?? [];
  const url = useSelector((state: RootState) => state.settings.url);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditGearFormData>();
  const dispatch = useDispatch();
  const [addedGear, setAddedGear] = useState<GearType[]>([]);
  const [deletedGear, setDeletedGear] = useState<GearType[]>([]);

  useEffect(() => {
    setAddedGear([]);
    setDeletedGear([]);
    reset({ gear: gear ?? [] });
  }, [reset, character]);

  const handleIncrement = (): void => {
    setAddedGear((gear) => [
      ...gear,
      { id: "", name: "", quantity: '1', weight: "-" },
    ]);
  };
  const handleDecrement = (index: number): void => {
    setAddedGear((gear) => gear.filter((_, itemIndex) => itemIndex !== index));
  };
  const handleDeleteGear = (gearItem: GearType): void => {
    setDeletedGear((gear) => [...gear, gearItem]);
  };
  const handleCancel = (): void => {
    setAddedGear([]);
    setDeletedGear([]);
    reset({ gear: gear ?? [] });
  };
  const onSubmit: SubmitHandler<EditGearFormData> = async (
    data
  ): Promise<void> => {
    try {
      const updateGear: GearType[] = data.gear.filter((gear) => {
        return !deletedGear.some((deleteGear) => deleteGear.id === gear.id);
      });
      if (data.addedGear) {
        updateGear.push(...data.addedGear);
      }
      const mapGear = updateGear.map(item => {
        const mapItem: GearModel ={
          id: item.id!,
          name: item.name,
          quantity: parseFloat(item.quantity),
          weight: item.weight
        }
        return mapItem
      })
      const request: UpdateCharacterDefinitionRequestModel<GearModel> = {
        id: character?.id!,
        updateDefinition: mapGear,
      };
      const response = await CharacterApi.UpdateGearAsync(token, url, request);
      if (response.isError) {
        dispatch(
          bannerActions.changeText({
            title: "Error",
            paragraph: "There was an error updating your Gear",
          })
        );
      } else {
        dispatch(
          bannerActions.changeText({
            title: "Success",
            paragraph: "Your Gear has been updated",
          })
        );
        dispatch(accountActions.updateGear(mapGear));
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
  return (
    <>
      <ScrollView>
        <Text style={editGearStyles.text(theme.fontSize.large)}>Gear</Text>
        {!!character && (
          <>
            <View style={editGearStyles.header.row}>
              <View style={editGearStyles.header.textContainer}>
                <Text style={editGearStyles.text(theme.fontSize.small)}>
                  Name
                </Text>
              </View>
              <View style={editGearStyles.header.textContainer}>
                <Text style={editGearStyles.text(theme.fontSize.small)}>
                  Quantity
                </Text>
              </View>
              <View style={editGearStyles.header.textContainer}>
                <Text style={editGearStyles.text(theme.fontSize.small)}>
                  Weight
                </Text>
              </View>
              <View style={editGearStyles.header.textContainer}>
                <Text style={editGearStyles.text(theme.fontSize.small)}>
                  Delete
                </Text>
              </View>
            </View>
            {gear?.map((gear, index) => (
              <Fragment key={gear.id + gear.name + index}>
                <View
                  style={editGearStyles.row(
                    deletedGear.some(item => {
                      if(item.id){
                        return item.id === gear.id
                      }
                      else{
                        return gear.name === item.name
                      }
                    }) ? 0.3 : 1
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
                        style={editGearStyles.textInput.text}
                        placeholderTextColor={
                          editGearStyles.textInput.placeholderColor
                        }
                      />
                    )}
                    name={`gear.${index}.name`}
                  />
                  <Controller
                    control={control}
                    rules={{
                      shouldUnregister: false
                    }}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                      value={value}
                      keyboardType="numeric"
                      onChangeText={onChange}
                        style={editGearStyles.textInput.text}
                        placeholderTextColor={
                          editGearStyles.textInput.placeholderColor
                        }
                      />
                    )}
                    name={`gear.${index}.quantity`}
                  />
                  <Controller
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <TextInput
                        value={value!}
                        onChangeText={onChange}
                        style={editGearStyles.textInput.text}
                        placeholderTextColor={
                          editGearStyles.textInput.placeholderColor
                        }
                      />
                    )}
                    name={`gear.${index}.weight`}
                  />
                  <MaterialCommunityIcons
                    name="delete"
                    size={20}
                    color={theme.color.primary.error}
                    onPress={() => handleDeleteGear(gear)}
                  />
                </View>
                <LineBreak color={theme.color.primary.lightGray ?? "white"} />
              </Fragment>
            ))}
            <View style={editGearStyles.icon}>
              <FontAwesome5Icon
                name="plus-square"
                onPress={handleIncrement}
                color={theme.color.primary.white}
                size={30}
              />
            </View>
            {!!addedGear.length &&
              addedGear?.map((addGear, index) => (
                <Fragment key={index}>
                  <View style={editGearStyles.row(1)}>
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          value={value}
                          onChangeText={onChange}
                          style={editGearStyles.textInput.text}
                          placeholderTextColor={
                            editGearStyles.textInput.placeholderColor
                          }
                        />
                      )}
                      name={`addedGear.${index}.name`}
                    />
                    <Controller
                      control={control}
                      rules={{
                        required: true,
                      }}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          keyboardType="numeric"
                          value={value}
                          onChangeText={onChange}
                          style={editGearStyles.textInput.text}
                          placeholderTextColor={
                            editGearStyles.textInput.placeholderColor
                          }
                        />
                      )}
                      name={`addedGear.${index}.quantity`}
                    />
                    <Controller
                      control={control}
                      render={({ field: { onChange, value } }) => (
                        <TextInput
                          value={value!}
                          onChangeText={onChange}
                          style={editGearStyles.textInput.text}
                          placeholderTextColor={
                            editGearStyles.textInput.placeholderColor
                          }
                        />
                      )}
                      name={`addedGear.${index}.weight`}
                    />
                    <MaterialCommunityIcons
                      name="delete"
                      size={20}
                      color={theme.color.primary.error}
                      onPress={() => handleDecrement(index)}
                    />
                  </View>
                  {(errors?.addedGear?.[index]?.quantity ||
                    errors?.addedGear?.[index]?.name ||
                    errors?.addedGear?.[index]?.weight) && <ErrorField />}
                  <LineBreak color={theme.color.primary.lightGray ?? "white"} />
                </Fragment>
              ))}
          </>
        )}
      </ScrollView>
      <View style={editGearStyles.buttons}>
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
