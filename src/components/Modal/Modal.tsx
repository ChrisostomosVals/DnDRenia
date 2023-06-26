import { useSelector } from "react-redux";
import { modalStyles } from "./Modal.style";
import { Text, Modal, View } from "react-native";
import { RootState } from "../../store/store";
import { ModalProps } from "./ModalProps";
import { FC } from "react";
export const CustomModal: FC<ModalProps> = ({
  footer
}) => {
  const modal = useSelector((state: RootState) => state.modal.modal)
  return (
    <Modal
      visible={modal.visible}
      animationType={modal.animationType}
      transparent
    >
      <View style={modalStyles.body.container} >
      <View style={modalStyles.title.container}>
        <Text style={modalStyles.title.text}>{modal.title}</Text>
      </View>
      {modal.subTitle && 
      <View style={modalStyles.subtitle.container}>
        <Text style={modalStyles.subtitle.text}>{modal.subTitle}</Text>
      </View>
      }
      <View style={modalStyles.footer.container}>{footer}</View>
      </View>
      
    </Modal>
  );
};
