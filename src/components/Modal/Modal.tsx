import { useDispatch, useSelector } from "react-redux";
import { modalStyles } from "./Modal.style";
import { Text, Modal, View, TextInput, Dimensions } from "react-native";
import { RootState } from "../../store/store";
import { LogoutModalProps, ModalProps } from "./ModalProps";
import { FC, Fragment, useEffect, useMemo, useState } from "react";
import { Button } from "../Button/Button";
import modalActions from "../../store/modal/actions";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { loginStyles } from "../../screens/Login/Login.style";
import LocationApi from "../../dist/api/LocationApi";
import InsertLocationRequestModel from "../../dist/models/InsertLocationRequestModel";
import bannerActions from "../../store/banner/actions";
import mapActions from "../../store/map/actions";
import WorldObjectApi from "../../dist/api/WorldObjectApi";
import CreateWorldObjectRequestModel from "../../dist/models/CreateWorldObjectRequestModel";
import DropDownPicker, { ItemType } from "react-native-dropdown-picker";
const LogoutModal: FC<LogoutModalProps> = ({ footer }) => {
  const modal = useSelector((state: RootState) => state.modal.logoutModal);
  return (
    <Modal
      visible={modal.visible}
      animationType={modal.animationType}
      transparent
    >
      <View style={modalStyles.body.container}>
        <View style={modalStyles.title.container}>
          <Text style={modalStyles.title.text}>{modal.title}</Text>
        </View>
        {modal.subTitle && (
          <View style={modalStyles.subtitle.container}>
            <Text style={modalStyles.subtitle.text}>{modal.subTitle}</Text>
          </View>
        )}
        <View style={modalStyles.footer.container}>{footer}</View>
      </View>
    </Modal>
  );
};

const CalloutModal: FC = () => {
  const modal = useSelector((state: RootState) => state.modal.calloutModal);
  const dispatch = useDispatch();
  const handlePress = (): void => {
    dispatch(modalActions.setCalloutVisibility(false));
  };

  return (
    <Modal
      visible={modal.visible}
      animationType={modal.animationType}
      transparent
    >
      <View style={modalStyles.body.container}>
        <View style={modalStyles.title.container}>
          <Text style={modalStyles.title.text}>{modal.title}</Text>
        </View>
        {modal.subTitle && (
          <View style={modalStyles.subtitle.container}>
            <Text style={modalStyles.subtitle.text}>{modal.subTitle}</Text>
          </View>
        )}

        {!!modal.events?.length && (
          <View style={modalStyles.calloutContent.container}>
            {modal.events.map((event: string, index: number) => (
              <Fragment key={index + "event"}>
                <Text style={modalStyles.calloutContent.text}>{event}</Text>
                <View style={modalStyles.calloutContent.lineBreak} />
              </Fragment>
            ))}
          </View>
        )}
        <View style={modalStyles.button}>
          <Button.Secondary title="Close" onPress={handlePress} />
        </View>
      </View>
    </Modal>
  );
};

const LocationModal: FC = () => {
  const modal = useSelector((state: RootState) => state.modal.locationModal);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LocationFormData>({
    defaultValues: {
      time: undefined,
      date: undefined,
      year: undefined,
      season: undefined,
    },
  });
  const dispatch = useDispatch();
  const handleCancel = (): void => {
    dispatch(modalActions.setLocationVisibility(false));
    control._reset();
  };
  const { height } = Dimensions.get("window");
  const token =
    useSelector((state: RootState) => state.account.tokens?.accessToken) ?? "";
  const marker = useSelector((state: RootState) => state.map.marker);
  const url = useSelector((state: RootState) => state.settings.url);
  const handleSave: SubmitHandler<LocationFormData> = async (
    data
  ): Promise<void> => {
    const request: InsertLocationRequestModel = {
      x: marker?.longitude.toString()!,
      y: marker?.latitude.toString()!,
      date: Number(data.date),
      season: data.season,
      time: data.time,
      year: Number(data.year),
      events: [],
    };
    const response = await LocationApi.CreateAsync(token, url, request);
    if (response.isError) {
      dispatch(
        bannerActions.changeText({
          paragraph: "Error",
          title: "There was an error saving location",
        })
      );
    } else {
      dispatch(
        bannerActions.changeText({
          paragraph: "Success",
          title: "Location saved",
        })
      );
    }
    dispatch(modalActions.setLocationVisibility(false));
    dispatch(bannerActions.toggle(true));
    dispatch(mapActions.setMarker(undefined));
    const locations = await LocationApi.GetAsync(token, url);
    if (!locations.isError) {
      dispatch(mapActions.setLocations(locations.data!));
    }
    dispatch(mapActions.setMarker(undefined));
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
            minLength: 1,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Time"
              placeholderTextColor={loginStyles.textInput.placeholderColor}
              style={loginStyles.textInput.text}
              value={value}
            />
          )}
          name="time"
        />
        {errors.time && <Error />}
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 1,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              keyboardType="numeric"
              placeholder="Date"
              onChangeText={onChange}
              placeholderTextColor={loginStyles.textInput.placeholderColor}
              style={loginStyles.textInput.text}
              value={value}
            />
          )}
          name="date"
        />
        {errors.date && <Error />}
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 1,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              keyboardType="numeric"
              placeholder="Year"
              onChangeText={onChange}
              style={loginStyles.textInput.text}
              placeholderTextColor={loginStyles.textInput.placeholderColor}
              value={value}
            />
          )}
          name="year"
        />
        {errors.year && <Error />}
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 1,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              placeholder="Season"
              onChangeText={onChange}
              style={loginStyles.textInput.text}
              placeholderTextColor={loginStyles.textInput.placeholderColor}
              value={value}
            />
          )}
          name="season"
        />
        {errors.season && <Error />}
        <View style={modalStyles.footer.container}>
          <Button.Secondary title="Cancel" onPress={handleCancel} />
          <Button.Primary title="Save" onPress={handleSubmit(handleSave)} />
        </View>
      </View>
    </Modal>
  );
};
type LocationFormData = {
  time: string;
  date: string;
  year: string;
  season: string;
};
const WorldObjectModal: FC = () => {
  const modal = useSelector((state: RootState) => state.modal.worldObjectModal);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<WorldObjectFormData>({});
  const [open, setOpen] = useState<boolean>(false);
  const dispatch = useDispatch();
  const handleCancel = (): void => {
    dispatch(modalActions.setWorldObjectVisibility(false));
    control._reset();
  };
  const { height } = Dimensions.get("window");
  const token =
    useSelector((state: RootState) => state.account.tokens?.accessToken) ?? "";
  const marker = useSelector((state: RootState) => state.map.marker);
  const url = useSelector((state: RootState) => state.settings.url);
  const handleSave: SubmitHandler<WorldObjectFormData> = async (
    data
  ): Promise<void> => {
    const request: CreateWorldObjectRequestModel = {
      name: data.name,
      type: data.type,
      description: data.description,
      properties: [
        {
          name: "latitude",
          value: marker?.latitude.toString() ?? "",
        },
        {
          name: "longitude",
          value: marker?.longitude.toString() ?? "",
        },
      ],
    };
    const response = await WorldObjectApi.CreateAsync(token, url, request);
    if (response.isError) {
      dispatch(
        bannerActions.changeText({
          paragraph: "Error",
          title: "There was an error saving location",
        })
      );
    } else {
      dispatch(
        bannerActions.changeText({
          paragraph: "Success",
          title: "Location saved",
        })
      );
    }
    dispatch(modalActions.setWorldObjectVisibility(false));
    dispatch(bannerActions.toggle(true));
    const worldObjects = await WorldObjectApi.GetAsync(token, url);
    if (!worldObjects.isError) {
      dispatch(mapActions.setWorldObjects(worldObjects.data!));
    }
    dispatch(mapActions.setMarker(undefined));
  };
  const isError = useMemo(() => {
    return (): boolean => {
      if (control._formValues.name || control._formValues.type) return false;
      return true;
    };
  }, [control._formValues.name, control._formValues.type]);
  const types: ItemType<string>[] = [
    { label: "Building", value: "Building" },
    { label: "Village", value: "Village" },
    { label: "Town", value: "Town" },
    { label: "City", value: "City" },
    { label: "Site", value: "Site" },
  ];
  return (
    <Modal
      visible={modal.visible}
      animationType={modal.animationType}
      transparent
      onDismiss={() => {
        control._reset();
      }}
    >
      <View style={modalStyles.worldObjectModal.container(height / 2)}>
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
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              onChangeText={onChange}
              placeholder="Name"
              placeholderTextColor={loginStyles.textInput.placeholderColor}
              style={loginStyles.textInput.text}
              value={value}
            />
          )}
          name="name"
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <View style={modalStyles.worldObjectModal.picker.container}>
              <DropDownPicker
                style={modalStyles.worldObjectModal.picker.main}
                value={field.value}
                textStyle={modalStyles.worldObjectModal.text}
                placeholder="Type"
                items={types}
                scrollViewProps={{
                  scrollEnabled: true,
                }}
                listMode="SCROLLVIEW"
                showTickIcon={false}
                listItemContainerStyle={
                  modalStyles.worldObjectModal.picker.item
                }
                dropDownContainerStyle={
                  modalStyles.worldObjectModal.picker.dropDownContainerStyle
                }
                selectedItemContainerStyle={
                  modalStyles.worldObjectModal.picker.selectedItem
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
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              onBlur={onBlur}
              placeholder="Description"
              onChangeText={onChange}
              style={loginStyles.textInput.text}
              placeholderTextColor={loginStyles.textInput.placeholderColor}
              value={value}
            />
          )}
          name="description"
        />
        <View style={modalStyles.footer.container}>
          <Button.Secondary title="Cancel" onPress={handleCancel} />
          <Button.Primary
            title="Save"
            disabled={isError()}
            extentedStyles={{ opacity: isError() ? 0.5 : 1 }}
            onPress={handleSubmit(handleSave)}
          />
        </View>
      </View>
    </Modal>
  );
};
type WorldObjectFormData = {
  name: string;
  type: string;
  description: string;
};
export const CustomModal = {
  LogoutModal,
  CalloutModal,
  LocationModal,
  WorldObjectModal,
};

export const GenericModal: FC<ModalProps> = ({
  content,
  visible,
  onDismiss,
}) => {
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onDismiss={onDismiss}
    >
      {content}
    </Modal>
  );
};
