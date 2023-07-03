export type WorldState = {
    view: ViewType;
    initialised: boolean;
    loading: boolean;
}

export type ViewType = 'Locations' | 'World-Objects' | 'Characters';