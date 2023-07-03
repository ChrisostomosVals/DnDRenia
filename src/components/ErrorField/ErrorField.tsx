import { FC } from "react";
import { errorFieldStyles } from "./ErrorField.style";
import { Text } from "react-native-paper";

const ErrorField: FC = () => (
  <Text style={errorFieldStyles.errorText}>This Field is required</Text>
);

export default ErrorField;
