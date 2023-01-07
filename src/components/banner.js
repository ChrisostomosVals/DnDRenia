import { useEffect } from 'react';
import { Paragraph, Dialog, Portal } from 'react-native-paper';
import { globalStyles } from "../utils/styles";

export const Banner = (props) =>{
    useEffect(() =>{
    },[props])
    return(
    <Portal>
      <Dialog visible={props.visible} onDismiss={()=>props.hideDialog()} style={globalStyles.card}>
        <Dialog.Title style={globalStyles.textStyle}>{props.text.title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={globalStyles.textStyle}>{props.text.paragraph}</Paragraph>
        </Dialog.Content>
      </Dialog>
    </Portal>
    )
}