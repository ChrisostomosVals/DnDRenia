import { Dimensions } from "react-native";
import React, { useCallback, useMemo, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { globalStyles } from "../utils/styles";
import BottomSheet from "@gorhom/bottom-sheet";
import { MaterialCommunityIcons } from "@expo/vector-icons";

export const ProfileSheet = ({  setModalVisible, images, navigation, heroId }) => {

  const snapPoints = useMemo(() => ["25%", "50%"], []);
  const styles = StyleSheet.create({
    contentContainer: {
      alignItems: "flex-start",
    },
    modalView: {
      backgroundColor: "rgba(16,36,69,0.95)",
    },
    text: {
      ...globalStyles.textStyle,
      fontSize: 25,
      margin: 5,
    },
    row: {
      flexDirection: "row",
      justifyContent: "space-evenly",
      padding: 5,
    },
    icon: {
      backgroundColor: "white",
      padding: 5,
      borderRadius: 20,
      margin: 5,
    },
  });
  const handleNavigate = (page, props) => navigation.navigate(page, props);
  const handleSheetChanges = useCallback((index) => {}, []);
  return (
    <BottomSheet
      backgroundStyle={styles.modalView}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      onClose={() => setModalVisible(false)}
      enablePanDownToClose
    >
      <View style={styles.contentContainer}>
        <TouchableOpacity onPress={() => handleNavigate('ChooseProfileImage', {navigation: navigation, heroId: heroId, images: images})} style={styles.row}>
          <MaterialCommunityIcons
            name="account-box"
            size={25}
            style={styles.icon}
          />
          <Text style={styles.text}>Change Profile Image</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('MyImages', {navigation: navigation, heroId: heroId})} style={styles.row}>
          <MaterialCommunityIcons
            name="image-multiple"
            size={25}
            style={styles.icon}
          />
          <Text style={styles.text}>Pictures Display</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleNavigate('AddImages', {navigation: navigation, heroId: heroId})} style={styles.row}>
          <MaterialCommunityIcons
            name="image-plus"
            size={25}
            style={styles.icon}
          />
          <Text style={styles.text}>Add Images</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
  );
};
