import { FC, useMemo, useRef } from "react";
import BottomSheetView from "@gorhom/bottom-sheet";
import { CustomBottomSheetProps } from "./CustomBottomSheetProps";
import { customBottomSheetStyles } from "./CustomBottomSheet.style";


export const CustomBottomSheet: FC<CustomBottomSheetProps> = ({content}) =>{
    const snapPoints: string[] = useMemo(() => ["30%", "60%", '90%'], []);
    const sheetRef = useRef<BottomSheetView>(null);

    return (
       <BottomSheetView
        enablePanDownToClose
        backgroundStyle={customBottomSheetStyles.body}
        snapPoints={snapPoints}
        ref={sheetRef}
       >
            {content}
       </BottomSheetView>
    )
}