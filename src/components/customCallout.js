import { Callout } from "react-native-maps";
import { View, Text, StyleSheet, Image } from "react-native";
import { globalStyles } from "../utils/styles";


export const CustomCallout = ({ title, description }) => {
  return (
    <Callout tooltip={true}>
      <View style={styles.view}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </Callout>
  );
};

export const CustomCallout2 = ({ title, description }) => {
  return (
    <Callout tooltip={true}>
      <View style={styles.view}>
          <Text style={styles.title}>Date: {title.date} Time: {title.time}</Text>
          <Text style={styles.title}>Year: {title.year} Season: {title.season}</Text>
          {Array.isArray(description) ? (
            description.map((d, index) => <Text style={globalStyles.textStyle} key={index}>{d}</Text>)
          ) : (
            <Text style={globalStyles.textStyle}>{description}</Text>
          )}
      </View>
    </Callout>
  );
};

const styles = StyleSheet.create({
  view: {
    backgroundColor: "rgba(16,36,69,0.95)",
    ...globalStyles.card,
    padding: 10,
  },
  title: {
    fontSize: 20,
    ...globalStyles.textStyle,
    textAlign: "center",
  },
  description: {
    ...globalStyles.textStyle,
  },
});
