import { Callout } from "react-native-maps";
import { View, Text, StyleSheet, Image } from "react-native";
import { globalStyles } from "../utils/styles";

export const CustomCallout = ({
  title,
  description
}: any) => {
  return (
    // @ts-expect-error TS(2749): 'Callout' refers to a value, but is being used as ... Remove this comment to see the full error message
    <Callout tooltip={true}>
      // @ts-expect-error TS(7027): Unreachable code detected.
      <View style={styles.view}>
        // @ts-expect-error TS(2552): Cannot find name 'style'. Did you mean 'styles'?
        <Text style={styles.title}>{title}</Text>
        // @ts-expect-error TS(2552): Cannot find name 'style'. Did you mean 'styles'?
        <Text style={styles.description}>{description}</Text>
      </View>
    </Callout>
  );
};

export const CustomCallout2 = ({
  title,
  description
}: any) => {
  return (
    // @ts-expect-error TS(2749): 'Callout' refers to a value, but is being used as ... Remove this comment to see the full error message
    <Callout tooltip={true}>
      // @ts-expect-error TS(7027): Unreachable code detected.
      <View style={styles.view}>
        // @ts-expect-error TS(2304): Cannot find name 'style'.
        <Text style={styles.title}>
          Date: {title.date} Time: {title.time}
        </Text>
        // @ts-expect-error TS(2304): Cannot find name 'style'.
        <Text style={styles.title}>
          // @ts-expect-error TS(2304): Cannot find name 'Year'.
          Year: {title.year} Season: {title.season}
        </Text>
        {description.length > 0 ? (
          description.map((d: any, index: any) => (
            // @ts-expect-error TS(2304): Cannot find name 'style'.
            <Text style={globalStyles.textStyle} key={index}>
              // @ts-expect-error TS(18004): No value exists in scope for the shorthand propert... Remove this comment to see the full error message
              {d}
            </Text>
          ))
        // @ts-expect-error TS(2322): Type 'boolean' is not assignable to type 'Text'.
        ) : (
          // @ts-expect-error TS(2552): Cannot find name 'style'. Did you mean 'styles'?
          <Text style={globalStyles.textStyle}>
            // @ts-expect-error TS(2304): Cannot find name 'Apparently'.
            Apparently nothing important happened here...
          </Text>
        )}
      </View>
    </Callout>
  );
};

const styles = StyleSheet.create({
  view: {
    // @ts-expect-error TS(2783): 'backgroundColor' is specified more than once, so ... Remove this comment to see the full error message
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
