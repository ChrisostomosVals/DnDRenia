export type MainStatType = {
    name: string;
    value: string;
}

export type MainStatState = {
    mainStats: MainStatType[];
    loading: boolean;
    initialised: boolean;
}