import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
// @ts-expect-error TS(2306): File 'D:/chris/Coding/Mobile/DnDRenia/DnDRenia/src... Remove this comment to see the full error message
import ChapterApi from "../dist/api/ChapterApi";
import { useIsFocused } from "@react-navigation/native";
import { globalStyles } from "../utils/styles";
import Moment from "moment";
import { ScrollView } from "react-native-gesture-handler";
import { ChapterModal } from "../components/chapterModal";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Banner } from "../components/banner";
import { CreateChapterModal } from "../components/createChapterModal";
import { Skeleton } from "@rneui/themed";
import { CustomModal } from "../components/CustomModal";
import { ip } from "../utils/constants";

export const Chapters = () => {
  const [chapters, setChapters] = useState([]);
  const isFocused = useIsFocused();
  const [modalVisible, setModalVisible] = useState(false);
  const [createChapterModalVisible, setCreateChapterModalVisible] =
    useState(false);
  const [deleteChapterModalVisible, setDeleteChapterModalVisible] =
    useState(false);
  const [chapter, setChapter] = useState();
  const [bannerVisible, setBannerVisible] = useState(false);
  const [deleteChapter, setDeleteChapter] = useState();
  const [bannerText, setBannerText] = useState({
    title: "",
    paragraph: "",
  });
  const [loading, setLoading] = useState(false);
  const skeleton = [0, 1, 2, 3, 4, 5];
  useEffect(() => {
    setModalVisible(false);
    setLoading(true);
    fetchChapters();
  }, [isFocused, bannerText]);
  const fetchChapters = async () => {
    setChapters([]);
    const token = await AsyncStorage.getItem("token");
    const chaptersResponse = await ChapterApi.GetAsync(token, ip);
    if (chaptersResponse.isError) {
      console.log(chaptersResponse.error);
      setLoading(false);
      return;
    }
    setChapters(chaptersResponse.data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  const styles = StyleSheet.create({
    container: {
      height: "80%",
      width: "95%",
      alignSelf: "center",
      backgroundColor: "rgba(16,36,69,0.95)",
      borderRadius: 15,
      marginTop: "25%",
    },
    item: {
      backgroundColor: "rgb(16,36,69)",
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    skeletonItem: {
      padding: 20,
      flexDirection: "row",
      justifyContent: "space-between",
    },
    itemLine: {
      flexDirection: "row",
      alignItems: "center",
    },
    title: {
      ...globalStyles.textStyle,
      fontSize: 25,
    },
  });

  const Item = ({
    chapter
  }: any) => {
    return (
      <View style={styles.itemLine}>
        <View style={{ flex: 9 }}>
          <TouchableOpacity
            onPress={() => handleChapter(chapter)}
            style={styles.item}
          >
            <Text style={styles.title}>{chapter.name}</Text>
            <Text style={styles.title}>
              {Moment.utc(chapter.date).format("D MMM YYYY")}
            </Text>
          </TouchableOpacity>
        </View>

        <MaterialCommunityIcons
          style={{ flex: 1 }}
          color="#DAA520"
          name="delete"
          size={20}
          onPress={() => handleDelete({ id: chapter.id, name: chapter.name })}
        />
      </View>
    );
  };
  const handleChapter = (chapter: any) => {
    setChapter(chapter);
    setModalVisible(true);
  };
  const handleDelete = (id: any) => {
    setDeleteChapter(id);
    setDeleteChapterModalVisible(true);
  };
  const hideDialog = () => {
    setBannerVisible(false);
  };
  const handleNewChapter = () => {
    setCreateChapterModalVisible(true);
  };
  const handleConfirm = async () => {
    const token = await AsyncStorage.getItem("token");
    // @ts-expect-error TS(2532): Object is possibly 'undefined'.
    const deleted = await ChapterApi.DeleteAsync(token, ip, deleteChapter.id);
    if (deleted.isError) {
      console.log(deleted.error);
      setDeleteChapterModalVisible(false);
      setBannerText({
        title: "Error",
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        paragraph: `${deleteChapter.name} could not be Deleted`,
      });
      setBannerVisible(true);
      return;
    }
    // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
    const newItems = chapters.filter((item) => item.id !== deleteChapter.id);
    setChapters(newItems);
    setDeleteChapterModalVisible(false);
    setBannerVisible(true);
    setBannerText({
      title: "Deleted",
      // @ts-expect-error TS(2532): Object is possibly 'undefined'.
      paragraph: `${deleteChapter.name} has been Deleted`,
    });
  };
  const modalTitle = () => {
    return (
      <>
        Are you sure you want to{" "}
        // @ts-expect-error TS(2532): Object is possibly 'undefined'.
        <Text style={{ color: "#800909" }}>Delete</Text> {deleteChapter.name}
      </>
    );
  };
  return (
    <>
      <View style={styles.container}>
        {loading ? (
          <>
            {skeleton.map((s) => (
              <View key={s} style={styles.skeletonItem}>
                // @ts-expect-error TS(2322): Type 'string' is not assignable to type 'number'.
                <Skeleton animation="wave" width={"80%"} height={40} />
                <Skeleton animation="wave" circle width={40} height={40} />
              </View>
            ))}
          </>
        ) : (
          <ScrollView>
            {chapters.length > 0 &&
              // @ts-expect-error TS(2339): Property 'id' does not exist on type 'never'.
              chapters.map((c) => <Item key={c.id} chapter={c} />)}
            <MaterialCommunityIcons
              onPress={handleNewChapter}
              style={{ alignSelf: "center" }}
              name="pen-plus"
              color="#DAA520"
              size={40}
            />
          </ScrollView>
        )}
      </View>
      <ChapterModal
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        chapter={chapter}
        setBannerText={setBannerText}
        setBannerVisible={setBannerVisible}
      />
      <CreateChapterModal
        modalVisible={createChapterModalVisible}
        setModalVisible={setCreateChapterModalVisible}
        setBannerText={setBannerText}
        setBannerVisible={setBannerVisible}
      />
      {deleteChapter && (
        <CustomModal
          modalVisible={deleteChapterModalVisible}
          onClose={() => setDeleteChapterModalVisible(false)}
          onConfrim={handleConfirm}
          Children={<></>}
          title={modalTitle()}
        />
      )}

      <Banner
        hideDialog={hideDialog}
        visible={bannerVisible}
        text={bannerText}
      />
    </>
  );
};
