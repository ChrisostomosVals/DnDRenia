import { ReactNode } from "react";
import { ModalBaseProps } from "react-native";

export type ModalProps = {
    footer: ReactNode;
} & ModalBaseProps