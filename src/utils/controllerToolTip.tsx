import { useState } from "react";
import { Tooltip } from '@rneui/themed';
import Modal from 'modal-react-native-web';

export const ControlledTooltip = (props) => {
    const [open, setOpen] = useState(false);
    return (
      <Tooltip
        visible={open}
        onOpen={() => {
          setOpen(true);
        }}
        onClose={() => {
          setOpen(false);
        }}
        {...props}
      />
    );
  };