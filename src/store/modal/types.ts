export type ModalState = {
    modal: ModalType;
    loading: boolean;
    initialised: boolean;
}

type ModalType = {
    title: string;
    subTitle?: string | null;
    visible: boolean;
}
export type ModalTexts = {
    title: string;
    subTitle: string | null
}