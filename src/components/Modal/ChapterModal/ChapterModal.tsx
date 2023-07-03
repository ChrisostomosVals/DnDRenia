import { FC, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Dimensions, Modal, Text, TextInput, View } from "react-native";
import { chapterModalStyles } from "./ChapterModal.style";
import { Button } from "../../Button/Button";
import { modalStyles } from "../Modal.style";
import bannerActions from "../../../store/banner/actions";
import modalActions from "../../../store/modal/actions";
import DateTimePicker from "@react-native-community/datetimepicker";
import ChapterApi from "../../../dist/api/ChapterApi";
import CreateChapterRequestModel from "../../../dist/models/CreateChapterRequestModel";
import chaptersActions from "../../../store/chapters/actions";
import UpdateChapterRequestModel from "../../../dist/models/UpdateChapterRequestModel";

export const ChapterModal: FC = () => {
  const modal = useSelector((state: RootState) => state.modal.chapterModal);
  const { date, id, name, story} = useSelector((state: RootState) => state.modal.chapterModal)
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<ChapterFormData>({
    defaultValues: {
      date: date,
      name: name,
      story: story
    },
  });
  const [dateState, setDateState] = useState<Date>(date)
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleCancel = (): void => {
    dispatch(modalActions.setChapterVisibility(false));
    dispatch(modalActions.resetChapterModal());
    control._reset();
  };
  useEffect(() => {
    reset({date, name, story})
    setDateState(dateState ?? new Date())
  }, [date, id, name, story, reset])
  const newChapter = useSelector((state: RootState) => state.modal.chapterModal.new);
  const { height } = Dimensions.get("window");
  const token =
    useSelector((state: RootState) => state.account.tokens?.accessToken) ?? "";
  const marker = useSelector((state: RootState) => state.map.marker);
  const url = useSelector((state: RootState) => state.settings.url);
  const handleSave: SubmitHandler<ChapterFormData> = async (
    data
  ): Promise<void> => {
    if(!newChapter){
        const request: CreateChapterRequestModel = {
          date: data.date.toISOString(),
          name: data.name!,
          story: data.story!
      }
      const response = await ChapterApi.CreateAsync(token, url, request)
      if(response.isError){
          dispatch(bannerActions.changeText({
              title: 'Error',
              paragraph: 'There was an error saving chapter'
          }));
      }
      else{
          dispatch(bannerActions.changeText({
              title: 'Success',
              paragraph: 'Chapter Saved'
          }));
          const chapters = await ChapterApi.GetAsync(token, url);
          if(!chapters.isError){
              dispatch(chaptersActions.setChapters(chapters.data ?? []))
          }
      }
    }
    else{
      const request: UpdateChapterRequestModel = {
        id: id ?? '',
        date: data.date.toISOString(),
        name: data.name!,
        story: data.story!
    }
    const response = await ChapterApi.UpdateAsync(token, url, request)
    if(response.isError){
        dispatch(bannerActions.changeText({
            title: 'Error',
            paragraph: 'There was an error saving chapter'
        }));
    }
    else{
        dispatch(bannerActions.changeText({
            title: 'Success',
            paragraph: 'Chapter Saved'
        }));
        const chapters = await ChapterApi.GetAsync(token, url);
        if(!chapters.isError){
            dispatch(chaptersActions.setChapters(chapters.data ?? []))
        }
    }
    }
    dispatch(modalActions.setChapterVisibility(false));
    dispatch(modalActions.resetChapterModal());
    dispatch(bannerActions.toggle(true));
    control._reset();
  };
  const Error: FC = () => (
    <Text style={modalStyles.errorText}>This Field is required</Text>
  );
  return (
    <Modal
      visible={modal.visible}
      animationType={modal.animationType}
      transparent
      onDismiss={() => {
        control._reset();
      }}
    >
      <View style={modalStyles.logoutModal.container(height / 2)}>
        <View style={modalStyles.title.container}>
          <Text style={modalStyles.title.text}>{modal.title}</Text>
        </View>
        {modal.subTitle && (
          <View style={modalStyles.subtitle.container}>
            <Text style={modalStyles.subtitle.text}>{modal.subTitle}</Text>
          </View>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          defaultValue={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Name"
              placeholderTextColor={
                chapterModalStyles.textInput.placeholderColor
              }
              style={chapterModalStyles.textInput.text}
              value={value}
          />
          )}
          name="name"
        />
        {errors.name && <Error />}
        {show && (
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <DateTimePicker
                onChange={(event, value) => {
                  onChange(value ?? new Date());
                  setDateState(value ?? new Date());
                  setShow(false);
                }}
                onTouchCancel={() =>setShow(false)}
                style={{ zIndex: 1000 }}
                value={value}
                mode="date"
              />
            )}
            name="date"
          />
        )}
        <View style={chapterModalStyles.date.container}>
            <Text onPress={() => setShow(true)} style={chapterModalStyles.date.text}>{dateState.toDateString()}</Text>
        </View>

        {errors.date && <Error />}
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          defaultValue={story}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              placeholder="Story"
              onChangeText={onChange}
              style={chapterModalStyles.textInput.text}
              placeholderTextColor={
                chapterModalStyles.textInput.placeholderColor
              }
              value={value}
          />
          )}
          name="story"
        />
        {errors.story && <Error />}
        <View style={chapterModalStyles.footer.container}>
          <Button.Secondary title="Cancel" onPress={handleCancel} />
          <Button.Primary title="Save" onPress={handleSubmit(handleSave)} />
        </View>
      </View>
    </Modal>
  );
};
type ChapterFormData = {
  date: Date;
  name?: string;
  story?: string;
};
