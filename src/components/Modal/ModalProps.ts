import { ReactNode } from "react";
import { ModalBaseProps, StyleProp, ViewStyle } from "react-native";

export type LogoutModalProps = {
    footer: ReactNode;
} & ModalBaseProps

export type ModalProps = {
    title: string;
    content?: ReactNode;
    onDismiss?(): void;
    submitButton:{
        title: string;
        onPress: (({}: any) => void);
    }
    cancelButton:{
        title: string;
        onPress: (({}: any) => void);
    }
} & ModalBaseProps