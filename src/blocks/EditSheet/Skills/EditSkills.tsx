import { FC, Fragment, useEffect } from "react";
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { editSkillsStyles } from "./EditSkills.style";
import { theme } from "../../../theme/theme";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { FieldProps, SkillsFormData } from "./EditSkills.type";
import { LineBreak } from "../../../components/LineBreak/LineBreak";
import Checkbox from "expo-checkbox";
import SimpleLineIcons from "react-native-vector-icons/SimpleLineIcons";
import { Button } from "../../../components/Button/Button";
import bannerActions from "../../../store/banner/actions";
import accountActions from "../../../store/account/actions";
import UpdateCharacterDefinitionRequestModel from "../../../dist/models/UpdateCharacterDefinitionRequestModel";
import SkillModel from "../../../dist/models/SkillModel";
import CharacterApi from "../../../dist/api/CharacterApi";

export const EditSkills: FC = () => {
  const character = useSelector((state: RootState) => state.account.character);
  const {
    control,
    handleSubmit,
    reset,
  } = useForm<SkillsFormData>();
  const token = useSelector(
    (state: RootState) => state.account.tokens?.accessToken ?? ""
  );
  const url = useSelector((state: RootState) => state.settings.url);
  const handleIncrement = (field: FieldProps) => {
    const currentValue = field.value || 0;
    field.onChange(currentValue + 1);
  };

  const handleDecrement = (field: FieldProps) => {
    const currentValue = field.value || 0;
    field.onChange(currentValue - 1);
  };
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<SkillsFormData> = async (data):Promise<void> => {
    try{
        const request: UpdateCharacterDefinitionRequestModel<SkillModel> = {
            id: character?.id!,
            updateDefinition: data.skills,
          };
          const response = await CharacterApi.UpdateSkillsAsync(token, url, request);
        if (response.isError) {
            dispatch(
              bannerActions.changeText({
                title: "Error",
                paragraph: "There was an error updating your Skills",
              })
            );
          } else {
            dispatch(
              bannerActions.changeText({
                title: "Success",
                paragraph: "Your Skills have been updated",
              })
            );
            dispatch(accountActions.updateSkills(data.skills));
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
    reset({ skills: character?.skills! });
  }, [character, reset]);
  return (
    <>
      <ScrollView>
        <Text style={editSkillsStyles.text(theme.fontSize.large, 'center')}>Skills</Text>
        <View style={editSkillsStyles.header.row}>
          <View style={editSkillsStyles.header.leftContainer}>
            <View />
            <View />
          </View>
          <View style={editSkillsStyles.header.rightContainer}>
            <Text style={editSkillsStyles.text(theme.fontSize.small, undefined)}>
              Ability{"\n"}Mod
            </Text>
            <Text style={editSkillsStyles.text(theme.fontSize.small, undefined)}>
              Ranks
            </Text>
            <Text style={editSkillsStyles.text(theme.fontSize.small, undefined)}>
              Misc.{"\n"}Mod
            </Text>
            <Text style={editSkillsStyles.text(theme.fontSize.small, undefined)}>
              Trained
            </Text>
          </View>
        </View>

        {character?.skills?.map((skill, index) => (
          <Fragment key={skill.name + index}>
            <View style={editSkillsStyles.row}>
              <View style={editSkillsStyles.skills.leftContainer}>
                <Text
                  ellipsizeMode="clip"
                  style={editSkillsStyles.text(theme.fontSize.small, undefined)}
                >
                  {skill.name}:
                </Text>
              </View>
              <View style={editSkillsStyles.skills.rightContainer}>
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <View style={editSkillsStyles.numbers.container}>
                        <Text style={editSkillsStyles.numbers.text}>
                          {value}
                        </Text>
                      </View>

                      <View>
                        <SimpleLineIcons
                          name="arrow-up"
                          onPress={() => handleIncrement({ onChange, value })}
                          size={15}
                          color={theme.color.primary.lightGray}
                        />

                        <SimpleLineIcons
                          name="arrow-down"
                          onPress={() => handleDecrement({ onChange, value })}
                          size={15}
                          color={theme.color.primary.lightGray}
                        />
                      </View>
                    </>
                  )}
                  name={`skills.${index}.abilityMod`}
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <View style={editSkillsStyles.numbers.container}>
                        <Text style={editSkillsStyles.numbers.text}>
                          {value}
                        </Text>
                      </View>

                      <View>
                        <SimpleLineIcons
                          name="arrow-up"
                          onPress={() => handleIncrement({ onChange, value })}
                          size={15}
                          color={theme.color.primary.lightGray}
                        />

                        <SimpleLineIcons
                          name="arrow-down"
                          onPress={() => handleDecrement({ onChange, value })}
                          size={15}
                          color={theme.color.primary.lightGray}
                        />
                      </View>
                    </>
                  )}
                  name={`skills.${index}.ranks`}
                />
                <Controller
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <View style={editSkillsStyles.numbers.container}>
                        <Text style={editSkillsStyles.numbers.text}>
                          {value}
                        </Text>
                      </View>

                      <View>
                        <SimpleLineIcons
                          name="arrow-up"
                          onPress={() => handleIncrement({ onChange, value })}
                          size={15}
                          color={theme.color.primary.lightGray}
                        />

                        <SimpleLineIcons
                          name="arrow-down"
                          onPress={() => handleDecrement({ onChange, value })}
                          size={15}
                          color={theme.color.primary.lightGray}
                        />
                      </View>
                    </>
                  )}
                  name={`skills.${index}.miscMod`}
                />

                <Controller
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      value={field.value}
                      onValueChange={field.onChange}
                    />
                  )}
                  name={`skills.${index}.trained`}
                />
              </View>
            </View>
            <LineBreak color={theme.color.primary.lightGray ?? "white"} />
          </Fragment>
        ))}
      </ScrollView>
      <View style={editSkillsStyles.button}>
        <Button.Secondary title="Save" onPress={handleSubmit(onSubmit)} />
      </View>
    </>
  );
};
