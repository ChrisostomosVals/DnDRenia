import { useState } from "react";
import { Tooltip } from '@rneui/themed';
// @ts-expect-error TS(7016): Could not find a declaration file for module 'moda... Remove this comment to see the full error message
import Modal from 'modal-react-native-web';

export const ControlledTooltip = (props: any) => {
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