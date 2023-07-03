export type ModalState = {
    logoutModal: LogoutModalType;
    calloutModal: CalloutModalType;
    locationModal: LocationModalType;
    worldObjectModal: WorldObjectModalType;
    chapterModal: ChapterModal;
    loading: boolean;
    initialised: boolean;
}

type LogoutModalType = {
    title: string;
    subTitle?: string | null;
    visible: boolean;
    animationType: "fade" | "slide" | "none" | undefined;
}
type CalloutModalType = {
    events: string[];
} & LogoutModalType

type LocationModalType = {
    date: number;
    time?: string;
    year: number;
    season?: string;
} & LogoutModalType
type WorldObjectModalType ={
    name?: string;
    type?: string;
    description?: string;
} & LogoutModalType
export type ModalTexts = {
    title: string;
    subTitle: string | null
}
type ChapterModal = {
    id?: string;
    new: boolean;
    name?: string;
    date: Date;
    story?: string;
} & LogoutModalType
export type CalloutTexts = {
    events: string[];
} & ModalTexts