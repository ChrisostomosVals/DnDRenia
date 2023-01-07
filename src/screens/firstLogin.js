import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import {
  StyleSheet,
  TextInput,
  Text,
  View,
  TouchableOpacity,
  Alert,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { CharacterApi, ClassApi, ClassCategoryApi, RaceApi, RaceCategoryApi } from "../utils/api.service";

export const FirstLogin = (props) => {
  const [openClassCategories, setOpenClassCategories] = useState(false);
  const [openRaceCategories, setOpenRaceCategories] = useState(false);
  const [openClasses, setOpenClasses] = useState(false);
  const [openRaces, setOpenRaces] = useState(false);
  const [valueClassCategories, setValueClassCategories] = useState(null);
  const [valueRaceCategories, setValueRaceCategories] = useState(null);
  const [valueClasses, setValueClasses] = useState(0);
  const [valueRaces, setValueRaces] = useState(0);
  const [classCategories, setClassCategories] = useState([]);
  const [raceCategories, setRaceCategories] = useState([]);
  const [classes, setClasses] = useState([]);
  const [races, setRaces] = useState([]);
  const [name, setName] = useState("");
  const [createNew, setCreateNew] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);
  const fetchItems = async () => {
    const fetchClassCategories = await ClassCategoryApi.Get();
    const fetchRaceCategories = await RaceCategoryApi.Get();
    let classCategories = [];
    let raceCategories = [];
    for (let item of fetchClassCategories) {
      classCategories.push({ label: item.name, value: item.id });
    }
    for (let item of fetchRaceCategories) {
      raceCategories.push({ label: item.name, value: item.id });
    }
    setClassCategories(classCategories);
    setRaceCategories(raceCategories);
  };
  const fetchClasses = async () => {
    const fetchClasses = await ClassApi.GetByCategoryId(valueClassCategories);
    let classes = [];
    for (let item of fetchClasses) {
      classes.push({ label: item.name, value: item.id });
    }
    setClasses(classes);
  };
  const fetchRaces = async () => {
    const fetchRaces = await RaceApi.GetByCategoryId(valueRaceCategories);
    let races = [];
    for (let item of fetchRaces) {
      races.push({ label: item.name, value: item.id });
    }
    setRaces(races);
  };
  const handleChangeName = (e) => {
    setName(e);
  };

  const handleCreate = () => {
    setCreateNew(true);
    
  };
  const handleContinue = async () => {
    await AsyncStorage.setItem("heroId", " ");
    props.fetchHero();
  };
  const createHero = async () => {
    const newChar = await CharacterApi.Create({
      name: name,
      type: "HERO",
      classId: valueClasses,
      raceId: valueRaces,
    });
    console.log(hero);
    if (hero) {
      Alert.alert("Error", "Creating your hero failed");
    } else {
      Alert.alert("Success", "Hero created!");
      setName("");
      setValueClassCategories(null);
      setValueClasses(0);
      setValueRaceCategories(null);
      setValueRaces(0);
      setCreateNew(false);
    }
  };
  const cancelCreate = () => {
    setCreateNew(false);
    setName("");
    setValueClassCategories(null);
    setValueClasses(0);
    setValueRaceCategories(null);
    setValueRaces(0);
  };
  return (
    <View style={styles.body}>
      {!createNew ? (
        <View style={styles.chooseContainer}>
          <View style={styles.choiceContainer}>
            <Text>I have already a hero</Text>
            <TouchableOpacity
              onPress={handleContinue}
              style={styles.buttonStyle}
            >
              <Text>Continue</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.choiceContainer}>
            <Text>Create a new hero</Text>
            <TouchableOpacity onPress={handleCreate} style={styles.buttonStyle}>
              <Text>Create</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={styles.container}>
          <TextInput
            style={styles.input}
            onChangeText={handleChangeName}
            value={name}
            placeholder="Hero Name"
          ></TextInput>
          <DropDownPicker
            placeholder="Select Class Category"
            onChangeValue={fetchClasses}
            open={openClassCategories}
            value={valueClassCategories}
            setValue={(e) => {
              setValueClassCategories(e);
              setValueClasses(0);
            }}
            setOpen={(thisOpen) => {
              setOpenClassCategories(thisOpen);
              setOpenClasses(false);
              setOpenRaces(false);
              setOpenRaceCategories(false);
            }}
            items={classCategories}
            style={styles.dropDownStyle}
            closeOnBackPressed
            itemSeparator={true}
            zIndex={7}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
          />
          {valueClassCategories && (
            <DropDownPicker
              placeholder="Select Class"
              open={openClasses}
              setOpen={(thisOpen) => {
                setOpenClasses(thisOpen);
                setOpenClassCategories(false);
                setOpenRaceCategories(false);
                setOpenRaces(false);
              }}
              items={classes}
              value={valueClasses}
              setValue={setValueClasses}
              style={styles.dropDownStyle}
              zIndex={5}
              closeOnBackPressed
              itemSeparator={true}
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
              }}
            />
          )}
          <DropDownPicker
            placeholder="Select Race Category"
            onChangeValue={fetchRaces}
            open={openRaceCategories}
            value={valueRaceCategories}
            setValue={(e) => {
              setValueRaceCategories(e);
              setValueRaces(0);
            }}
            setOpen={(thisOpen) => {
              setOpenRaceCategories(thisOpen);
              setOpenRaces(false);
              setOpenClasses(false);
              setOpenClassCategories(false);
            }}
            items={raceCategories}
            style={styles.dropDownStyle}
            closeOnBackPressed
            itemSeparator={true}
            zIndex={4}
            listMode="SCROLLVIEW"
            scrollViewProps={{
              nestedScrollEnabled: true,
            }}
          />
          {valueRaceCategories && (
            <DropDownPicker
              placeholder="Select Race"
              open={openRaces}
              setOpen={(thisOpen) => {
                setOpenRaces(thisOpen);
                setOpenClassCategories(false);
                setOpenRaceCategories(false);
                setOpenClasses(false);
              }}
              items={races}
              value={valueRaces}
              setValue={setValueRaces}
              style={styles.dropDownStyle}
              zIndex={3}
              closeOnBackPressed
              itemSeparator={true}
              listMode="SCROLLVIEW"
              scrollViewProps={{
                nestedScrollEnabled: true,
              }}
            />
          )}

          {name != "" && valueClasses != 0 && valueRaces !=0 && (
            <TouchableOpacity
              onPress={createHero}
              style={{ margin: 10, ...styles.buttonStyle }}
            >
              <Text>Confirm</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={cancelCreate}
            style={{ margin: 10, ...styles.buttonStyle }}
          >
            <Text>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  body: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  chooseContainer: {
    flex: 0.2,
    alignItems: "stretch",
    justifyContent: "space-between",
    alignSelf: "stretch",
    margin: 20,
    padding: 20,
    backgroundColor: "rgba(16,36,69,0.9)",
    borderRadius: 5,
  },
  choiceContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    borderWidth: 0.3,
    width: 90,
    backgroundColor: "rgb(220,220,220)",
    borderRadius: 5,
    textAlign: "center",
    margin: 10,
  },
  dropDownStyle: {
    backgroundColor: "#102445",
    marginBottom: 10,
  },
  buttonStyle: {
    borderRadius: 15,
    width: 90,
    height: 45,
    border: "2px solid #1A1A1A",
    backgroundColor: "#6e40c9",
    justifyContent: "center",
    alignItems: "center",
  },
});
