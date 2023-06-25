import { Paragraph, Dialog, Portal } from "react-native-paper";
import { bannerStyles } from "./Banner.style";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { BannerType } from "../../store/banner/types";
import { FC } from "react";
import bannerActions from "../../store/banner/actions";

export const Banner: FC = () => {
  const banner: BannerType = useSelector((state: RootState) => state.banner.banner);
  const dispatch = useDispatch();
  const onDismiss = (): void => dispatch(bannerActions.toggle(false))
    return (
    <Portal>
      <Dialog onDismiss={onDismiss} visible={banner.visible} style={bannerStyles.primary.dialog}>
        <Dialog.Title style={bannerStyles.primary.text}>{banner.title}</Dialog.Title>
        <Dialog.Content>
          <Paragraph style={bannerStyles.primary.text}>{banner.paragraph}</Paragraph>
        </Dialog.Content>
      </Dialog>
    </Portal>
    )
}