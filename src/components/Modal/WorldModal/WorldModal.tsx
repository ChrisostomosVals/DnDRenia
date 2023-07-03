import { FC } from "react";
import LocationModel from "../../../dist/models/LocationModel";
import WorldObjectModel from "../../../dist/models/WorldObjectModel";
import { Dimensions, Modal, Text, TextInput, View } from "react-native";
import { Button } from "../../Button/Button";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { modalStyles } from "../Modal.style";
import { GenericModal } from "../Modal";
import { worldModalStyles } from "./WorldModal.style";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../store/store";
import LocationApi from "../../../dist/api/LocationApi";
import UpdateLocationRequestModel from "../../../dist/models/UpdateLocationRequestModel";
import bannerActions from "../../../store/banner/actions";
import mapActions from "../../../store/map/actions";

const LocationModal: FC<
  LocationModel & { type: 'Create' | 'Delete', event: string, visible: boolean; handleVisiblity(visible: boolean): void }
> = ({
  id,
  date,
  season,
  time,
  events,
  year,
  visible,
  x,
  y,
  handleVisiblity,
  type,
  event
}) => {
  const url = useSelector((state: RootState) => state.settings.url);
  const token = useSelector(
    (state: RootState) => state.account.tokens?.accessToken ?? ""
  );
  const { height } = Dimensions.get("window");
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EventFormData>({
    defaultValues: {
      event: "",
    },
  });
  const Error: FC = () => (
    <Text style={modalStyles.errorText}>This Field is required</Text>
  );
  const handleCancel = (): void => {
    handleVisiblity(false);
    control._reset();
  };
  const dispatch = useDispatch();
  const handleSave: SubmitHandler<EventFormData> = async (
    data
  ): Promise<void> => {
    const newEvents = events?.map(ev => ev);
    newEvents?.push(data.event)
    const request: UpdateLocationRequestModel = {
      id,
      date,
      season,
      time,
      year,
      x,
      y,
      events: newEvents ?? [],
    };

    const response = await LocationApi.UpdateAsync(token, url, request);
    handleVisiblity(false);
    if (response.isError) {
      dispatch(
        bannerActions.changeText({
          title: "Error",
          paragraph: "There was an error adding event",
        })
      );
    } else {
      dispatch(
        bannerActions.changeText({
          title: "Success",
          paragraph: "Event saved",
        })
      );
      dispatch(mapActions.addEvent({ id, event: data.event }));
    }
    control._reset();
    dispatch(bannerActions.toggle(true));
  };
  const handleDelete = async(): Promise<void> =>{
    const newEvents = events?.filter(ev => ev !== event);
    const request: UpdateLocationRequestModel = {
      id,
      date,
      season,
      time,
      year,
      x,
      y,
      events: newEvents!
    };

    const response = await LocationApi.UpdateAsync(token, url, request);
    handleVisiblity(false);
    if (response.isError) {
      dispatch(
        bannerActions.changeText({
          title: "Error",
          paragraph: "There was an error removing this event",
        })
      );
    } else {
      dispatch(
        bannerActions.changeText({
          title: "Success",
          paragraph: "Events updated",
        })
      );
      dispatch(mapActions.removeEvent({ id, event: event }));
    }
    dispatch(bannerActions.toggle(true));
  }
  if(type === 'Delete')
    return <GenericModal 
      visible={visible}
      content={
        <>
          <View style={modalStyles.logoutModal.container(height / 2)}>
            <View style={modalStyles.title.container}>
              <Text style={modalStyles.title.text}>Do you want to delete this Event?</Text>
            </View>
            <View style={worldModalStyles.footer.container}>
              <Button.Secondary title="Cancel" onPress={handleCancel} />
              <Button.Primary title="Delete" onPress={handleDelete} />
            </View>
          </View>
          </>
      }
    />
  return (
    <GenericModal
      visible={visible}
      content={
        <>
          <View style={modalStyles.logoutModal.container(height / 2)}>
            <View style={modalStyles.title.container}>
              <Text style={modalStyles.title.text}>Add Event</Text>
            </View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              defaultValue={time}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  onBlur={onBlur}
                  onChangeText={onChange}
                  placeholder="Event"
                  placeholderTextColor={
                    worldModalStyles.textInput.placeholderColor
                  }
                  style={worldModalStyles.textInput.text}
                  value={value}
                />
              )}
              name="event"
            />
            {errors.event && <Error />}
            <View style={worldModalStyles.footer.container}>
              <Button.Secondary title="Cancel" onPress={handleCancel} />
              <Button.Primary title="Save" onPress={handleSubmit(handleSave)} />
            </View>
          </View>
        </>
      }
      onDismiss={() => {
        control._reset();
      }}
    />
  );
};
type EventFormData = {
  event: string;
};

export const WorldModal = {
  LocationModal,
};
