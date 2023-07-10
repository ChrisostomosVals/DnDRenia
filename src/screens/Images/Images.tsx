import { FC, useState } from "react";
import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ImageInfoModel } from "../../dist/models/ImageInfoModel";
import { imagesStyles } from "./Images.style";
import { theme } from "../../theme/theme";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { GenericModal } from "../../components/Modal/Modal";
import bannerActions from "../../store/banner/actions";
import CharacterApi from "../../dist/api/CharacterApi";
import * as ImagePicker from "expo-image-picker";
import { Button } from "../../components/Button/Button";
import UploadImageRequestModel from "../../dist/models/UploadImageRequestModel";
import * as MediaLibrary from 'expo-media-library';
import DeleteImagesRequestModel from "../../dist/models/DeleteImagesRequestModel";
import imagesActions from "../../store/images/actions";

type ImagePickerResult = ImagePicker.ImagePickerResult & { cancelled?: boolean };
export const Images: FC = () => {
  const [permissionResponse, requestPermission] = MediaLibrary.usePermissions();
  const character = useSelector((state: RootState) => state.account.character);
  const images = useSelector((state: RootState) => state.images.images);
  const characterImages = images.find((im) => im.id === character?.id)?.images;
  const token = useSelector(
    (state: RootState) => state.account.tokens?.accessToken ?? ""
  );
  const url = useSelector((state: RootState) => state.settings.url);
  const [image, setImage] = useState<string | null>(null);

  const pickImage = async (): Promise<void> => {
    const res = await MediaLibrary.requestPermissionsAsync();
    if (!res.granted) {
      await requestPermission();
      return;
    }
    let result: ImagePickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });
    delete result.cancelled;

    if (!result.canceled) {
      if (result.assets.length > 0) setImage(result.assets[0]!.uri);
    } else {
      setImage(null);
    }
  };

  const [deleteImage, setDeleteImage] = useState<string>("");
  const [show, setShow] = useState<boolean>(false);
  const dispatch = useDispatch();
  const renderItem: React.FC<{ item: ImageInfoModel }> = ({ item }) => (
    <>
      <Image
        source={{ uri: item.url }}
        style={imagesStyles.image(item.width / 2, item.height / 2)}
      />
      <MaterialCommunityIcons
        name="delete"
        size={30}
        style={imagesStyles.deleteIcon}
        color={theme.color.primary.error}
        onPress={() => handleDelete(item.path)}
      />
    </>
  );
  const handleDelete = (path: string): void => {
    setDeleteImage(path);
    setShow(true);
  };
  const submitDelete = async (): Promise<void> => {
    try {
      
        const request: DeleteImagesRequestModel = {
            id: character?.id!,
            paths: [deleteImage]
        }
      const response = await CharacterApi.DeleteImagesAsync(token, url, request)
      if(response.isError){
        dispatch(
            bannerActions.changeText({
              title: "Error",
              paragraph: "There was an error deleting the image",
            })
          );
      }
      else{
        dispatch(
            bannerActions.changeText({
              title: "Success",
              paragraph: "Image deleted",
            })
          );
          dispatch(imagesActions.removeImage({id: character?.id!, path: deleteImage}))
      }
      dispatch(bannerActions.toggle(true));
        setShow(false);
    } catch (ex: any) {
      dispatch(
        bannerActions.changeText({
          title: "Error",
          paragraph: "Something went wrong",
        })
      );
      dispatch(bannerActions.toggle(true));
      setShow(false);
    }
  };
  const handleCancel = (): void => {
    setDeleteImage("");
    setShow(false);
    setImage(null)
  };
  const handleSave = async (): Promise<void> => {
    try{
        if(!image) return;
        const img = await fetch(image);
        const blob = await img.blob();
        const file = new File([blob], image.split('/').pop()!, { type: blob.type,});
        
        const request: UploadImageRequestModel = {
            id: character?.id!,
            file: {
                name: file.name,
                type: file.type,
                uri: image
            }
        }
        const response = await CharacterApi.UploadImageAsync(token, url, request);
        if(response.isError){
            dispatch(bannerActions.changeText({
                title: 'Error',
                paragraph: 'Error uploading image'
            }))
        }
        else{
            dispatch(bannerActions.changeText({
                title: 'Success',
                paragraph: 'Image Uploaded successfully'
            }))
            setImage(null);
            const images = await CharacterApi.GetImagesAsync(token, url, character?.id!);
            if(!response.isError){
                dispatch(imagesActions.updateImages(images.data!))
            }
        }
        dispatch(bannerActions.toggle(true));
    }
    catch(ex: any){
        dispatch(bannerActions.changeText({
            title: 'Error',
            paragraph: 'Something went wrong'
        }))
        dispatch(bannerActions.toggle(true));
    }

  }
  return (
    <>
      <ScrollView contentContainerStyle={imagesStyles.container}>
        <View style={imagesStyles.header.container}>
          <Text style={imagesStyles.header.text}>Images</Text>
        </View>
        {!!images?.length && (
          <FlatList
            contentContainerStyle={imagesStyles.imagesContainer}
            data={characterImages}
            renderItem={renderItem}
            keyExtractor={(item) => item.url + character?.id}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        )}
        <MaterialCommunityIcons
          name="image-plus"
          size={30}
          color={theme.color.primary.white}
          onPress={pickImage}
        />
        {image && (
          <Image source={{ uri: image }} style={imagesStyles.image(200, 200)} />
        )}
        <View style={imagesStyles.buttons}>
          <Button.Primary
            extentedStyles={{ backgroundColor: theme.color.primary.darkPurple }}
            title="Cancel"
            onPress={handleCancel}
          />
          <Button.Secondary onPress={handleSave} title="Save" extentedStyles={{opacity: image ? 1 : 0.5}} disabled={!image} />
        </View>
      </ScrollView>
      <GenericModal
        title="Do you want to delete this Image?"
        visible={show}
        content={null}
        cancelButton={{
          title: "Cancel",
          onPress: handleCancel,
        }}
        submitButton={{
          title: "Confirm",
          onPress: submitDelete,
        }}
      />
    </>
  );
};
