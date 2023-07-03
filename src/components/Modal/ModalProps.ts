import { ReactNode } from "react";
import { ModalBaseProps, StyleProp, ViewStyle } from "react-native";

export type LogoutModalProps = {
    footer: ReactNode;
} & ModalBaseProps

export type ModalProps = {
    content: ReactNode;
    onDismiss?(): void;
} & ModalBaseProps