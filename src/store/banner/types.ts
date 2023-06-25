export type BannerType = {
    title: string;
    paragraph: string;
    visible: boolean;
}

export type BannerState = {
    banner: BannerType;
    loading: boolean;
    initialised: boolean;
}

export type BannerMessages = {
    title: string;
    paragraph: string;
}