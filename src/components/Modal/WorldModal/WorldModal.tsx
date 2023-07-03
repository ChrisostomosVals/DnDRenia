import { FC, useEffect, useState } from "react";
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
import ErrorField from "../../ErrorField/ErrorField";
import WorldObjectApi from "../../../dist/api/WorldObjectApi";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
import UpdateWorldObjectRequestModel from "../../../dist/models/UpdateWorldObjectRequestModel";

const LocationModal: FC<
  LocationModel & {
    type: "Create" | "Delete Event" | "Delete";
    event: string;
    visible: boolean;
    handleVisiblity(visible: boolean): void;
  }
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
  event,
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
    const newEvents = events?.map((ev) => ev);
    newEvents?.push(data.event);
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
  const handleDeleteEvent = async (): Promise<void> => {
    const newEvents = events?.filter((ev) => ev !== event);
    const request: UpdateLocationRequestModel = {
      id,
      date,
      season,
      time,
      year,
      x,
      y,
      events: newEvents!,
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
  };
  const handleDelete = async (): Promise<void> => {
    const response = await LocationApi.DeleteAsync(token, url, id);
    handleVisiblity(false);
    if (response.isError) {
      dispatch(
        bannerActions.changeText({
          title: "Error",
          paragraph: "There was an error deleting this location",
        })
      );
    } else {
      dispatch(
        bannerActions.changeText({
          title: "Success",
          paragraph: "Location deleted",
        })
      );
      dispatch(mapActions.removeLocation(id));
    }
    dispatch(bannerActions.toggle(true));
  };
  switch (type) {
    case "Create":
    default:
      return (
        <GenericModal
          visible={visible}
          title="Add Event"
          content={
            <>
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
            </>
          }
          submitButton={{
            title: "Save",
            onPress: handleSubmit(handleSave),
          }}
          cancelButton={{
            title: "Cancel",
            onPress: handleCancel,
          }}
          onDismiss={() => {
            control._reset();
          }}
        />
      );
    case "Delete Event":
      return (
        <GenericModal
          visible={visible}
          title={"Delete Event"}
          submitButton={{
            title: "Delete",
            onPress: handleDeleteEvent,
          }}
          cancelButton={{
            title: "Cancel",
            onPress: handleCancel,
          }}
        />
      );
    case "Delete":
      return (
        <GenericModal
          visible={visible}
          title={"Delete location"}
          submitButton={{
            title: "Delete",
            onPress: handleDelete,
          }}
          cancelButton={{
            title: "Cancel",
            onPress: handleCancel,
          }}
        />
      );
  }
};
type EventFormData = {
  event: string;
};
export const WorldObjectModal: FC<
  WorldObjectModel & {
    visible: boolean;
    handleVisiblity(visible: boolean): void;
    transactionType: 'Delete'| 'Edit'
  }
> = ({ id, description, name, type, visible, handleVisiblity, transactionType, properties }) => {
  const token = useSelector((state: RootState) => state.account.tokens?.accessToken ?? '')
  const url = useSelector((state: RootState) => state.settings.url)
  const [open, setOpen] = useState<boolean>(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<WorldObjectFormData>({
    defaultValues: {
      name: '',
      description: "",
    },
  });
  const types: ItemType<string>[] = [
    { label: "Building", value: "Building" },
    { label: "Village", value: "Village" },
    { label: "Town", value: "Town" },
    { label: "City", value: "City" },
    { label: "Site", value: "Site" },
  ];
  const dispatch = useDispatch();
  const handleSave: SubmitHandler<WorldObjectFormData> = async (
    data
  ): Promise<void> => {
    const request: UpdateWorldObjectRequestModel = {
      id: id,
      name: data.name,
      type: data.type,
      description: data.description,
      properties: properties
    };
    const response = await WorldObjectApi.UpdateAsync(token, url, request);
    if (response.isError) {
      dispatch(
        bannerActions.changeText({
          paragraph: "Error",
          title: "There was an error updating object",
        })
      );
    } else {
      dispatch(
        bannerActions.changeText({
          paragraph: "Success",
          title: "Object updated",
        })
      );
      dispatch(mapActions.updateObject(request))
    }
    handleVisiblity(false);
    dispatch(bannerActions.toggle(true));
  };
  const handleCancel = async (): Promise<void> => {
    handleVisiblity(false);
    control._reset();
  };
  const handleDelete = async(): Promise<void> => {
    const response = await WorldObjectApi.DeleteAsync(token, url, id);
    if(response.isError){
      dispatch(
        bannerActions.changeText({
          title: "Error",
          paragraph: "There was an error deleting this object",
        })
      );
    } else {
      dispatch(
        bannerActions.changeText({
          title: "Success",
          paragraph: "Object deleted",
        })
      );
      dispatch(mapActions.removeObject(id));
    }
    dispatch(bannerActions.toggle(true));
    handleVisiblity(false);
    control._reset();
  }
  useEffect(() => {
    reset({description: description ?? '', name})
  }, [description, id, reset])
  switch(transactionType){
    case 'Edit':
    default:
      return (
        <GenericModal
        title="Edit"
        content={
          <>
          <Controller
            control={control}
            rules={{
              required: true,
            }}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Name"
                placeholderTextColor={
                  worldModalStyles.textInput.placeholderColor
                }
                style={worldModalStyles.textInput.text}
                value={value}
              />
            )}
            name="name"
          />
          {errors.name && <ErrorField />}
          <Controller
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <View style={modalStyles.genericModal.picker.container}>
              <DropDownPicker
                style={modalStyles.genericModal.picker.main}
                value={field.value}
                textStyle={modalStyles.genericModal.text}
                placeholder="Type"
                items={types}
                scrollViewProps={{
                  scrollEnabled: true,
                }}
                listMode="SCROLLVIEW"
                showTickIcon={false}
                listItemContainerStyle={
                  modalStyles.genericModal.picker.item
                }
                dropDownContainerStyle={
                  modalStyles.genericModal.picker.dropDownContainerStyle
                }
                selectedItemContainerStyle={
                  modalStyles.genericModal.picker.selectedItem
                }
                multiple={false}
                setValue={() => {}}
                onSelectItem={(item) =>
                  field.onChange(item.value?.toString() ?? "Building")
                }
                open={open}
                setOpen={setOpen}
                arrowIconContainerStyle={{ display: "none" }}
              />
            </View>
          )}
          name="type"
        />
          {errors.description && <ErrorField />}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                onBlur={onBlur}
                onChangeText={onChange}
                placeholder="Description"
                placeholderTextColor={
                  worldModalStyles.textInput.placeholderColor
                }
                style={worldModalStyles.textInput.text}
                value={value}
              />
            )}
            name="description"
          />
        </>
        }
        visible={visible}
          submitButton={{
            title: "Save",
            onPress: handleSubmit(handleSave),
          }}
          cancelButton={{
            title: 'Cancel',
            onPress: handleCancel
          }}
        />
      );
    case 'Delete':
      return (
        <GenericModal
        title="Delete this Object"
        visible={visible}
          submitButton={{
            title: "Delete",
            onPress: handleDelete,
          }}
          cancelButton={{
            title: 'Cancel',
            onPress: handleCancel
          }}
        />
      );
  }
  
};

type WorldObjectFormData = {
  name: string;
  description: string;
  type: string;
};
export const WorldModal = {
  LocationModal,
  WorldObjectModal,
};
